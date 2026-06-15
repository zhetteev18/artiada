/**
 * Экспорт новостей из src/data/news.ts → public/content/news.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'content')
const outFile = path.join(outDir, 'news.json')

const { news } = await import('../src/data/news.ts')

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(outFile, JSON.stringify(news, null, 2), 'utf8')
console.log('Новости экспортированы:', outFile, `(${news.length} шт.)`)
