import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distIndexPath = path.join(__dirname, '..', 'dist', 'index.html')
const PORT = 4173
const URL = `http://localhost:${PORT}/`

function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tryFetch = async () => {
      try {
        await fetch(url)
        resolve()
      } catch {
        if (Date.now() - start > timeoutMs) {
          reject(new Error('vite preview no respondió a tiempo'))
        } else {
          setTimeout(tryFetch, 300)
        }
      }
    }
    tryFetch()
  })
}

async function main() {
  // detached: true puts `preview` in its own process group so the `finally`
  // block can kill the whole tree (npx's actual vite server runs as a child
  // process, not `preview` itself — killing only `preview.pid` can leave it
  // orphaned and holding the port on a subsequent run).
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: 'inherit',
    detached: true,
  })
  // Without a listener, a spawn failure (e.g. ENOENT if npx isn't on PATH,
  // or EACCES) emits an unhandled 'error' event that crashes the process
  // outside main()'s .catch(), bypassing the graceful-degradation design
  // below. The actual failure path is already covered by waitForServer's
  // timeout, which rejects and is caught normally — this listener only
  // exists to prevent the unhandled event from crashing first.
  preview.on('error', () => {})

  let browser
  try {
    await waitForServer(URL)

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.goto(URL, { waitUntil: 'networkidle0' })
    await page.waitForSelector('#root section')

    const html = await page.evaluate(() => document.documentElement.outerHTML)
    writeFileSync(distIndexPath, `<!doctype html>\n${html}\n`)

    console.log('Prerender OK: dist/index.html actualizado con HTML renderizado')
  } finally {
    // Cover every exit path (success or thrown error): close the browser
    // Puppeteer spawned, and kill the preview server's whole process group
    // (see comment above — npx's actual vite server is a child process, not
    // `preview` itself, so `preview.kill()` alone can leave it orphaned).
    await browser?.close()
    if (preview.pid) {
      try {
        process.kill(-preview.pid, 'SIGTERM')
      } catch {
        // process group may already be gone
      }
    }
  }
}

main().catch(err => {
  // Prerendering is an enhancement, not a build requirement: `vite build`
  // already produced a valid, functional dist/index.html (just without the
  // prerendered DOM). If Puppeteer/Chromium can't launch here — e.g. a
  // deploy container missing shared libs like libnss3.so — we must not fail
  // the whole build/deploy over it. Log a clear warning and leave the
  // vite-build output untouched (this script never deletes dist/index.html
  // itself; it's only overwritten on the success path above).
  console.warn(`⚠ Prerender falló, se conserva el dist/index.html sin prerenderizar: ${err.message}`)
  process.exit(0)
})
