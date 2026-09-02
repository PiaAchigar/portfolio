import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')
const svgInput = path.join(publicDir, 'favicon.svg')

const targets = [
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
]

async function main() {
  for (const { file, size } of targets) {
    const output = path.join(publicDir, file)
    await sharp(svgInput).resize(size, size).png().toFile(output)
    console.log(`✔ ${file} (${size}x${size})`)
  }
}

main().catch(err => {
  console.error('generate-icons falló:', err)
  process.exit(1)
})
