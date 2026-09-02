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
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: 'inherit',
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
    preview.kill()
  }
}

main().catch(err => {
  console.error('Prerender falló:', err)
  process.exit(1)
})
