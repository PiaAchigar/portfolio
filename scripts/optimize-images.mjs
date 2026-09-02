import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')

const images = [
  'pia.jpeg',
  'piaDev.jpeg',
  'centralPiubella.png',
  'saas_crm_complexa.png',
  'pag_web_piu.png',
  'album.png',
  'flow_n8n_chatBot.png',
  'rodynaFarmacias.png',
  'qr_generator.png',
]

async function main() {
  for (const file of images) {
    const input = path.join(publicDir, file)
    const output = path.join(publicDir, file.replace(/\.(png|jpe?g)$/i, '.webp'))
    await sharp(input).webp({ quality: 80 }).toFile(output)
    console.log(`✔ ${file} -> ${path.basename(output)}`)
  }
}

main().catch(err => {
  console.error('optimize-images falló:', err)
  process.exit(1)
})
