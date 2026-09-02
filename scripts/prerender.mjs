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

  try {
    await waitForServer(URL)

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.goto(URL, { waitUntil: 'networkidle0' })
    await page.waitForSelector('#root section')

    const html = await page.evaluate(() => document.documentElement.outerHTML)
    writeFileSync(distIndexPath, `<!doctype html>\n${html}\n`)

    await browser.close()
    console.log('Prerender OK: dist/index.html actualizado con HTML renderizado')
  } finally {
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
  console.error('Prerender falló:', err)
  process.exit(1)
})
