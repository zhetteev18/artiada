/**
 * Экспорт положений из src/data/contest-regulations.ts → public/content/contest-regulations.json
 * Требует запуска через: node --import tsx/esm scripts/sync-regulations-json.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'content')
const outFile = path.join(outDir, 'contest-regulations.json')

try {
  const { contestRegulations } = await import('../src/data/contest-regulations.ts')

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(contestRegulations, null, 2), 'utf8')
  console.log('Положения экспортированы:', outFile, `(${contestRegulations.length} шт.)`)
} catch (err) {
  if (fs.existsSync(outFile)) {
    console.log('Используем существующий contest-regulations.json')
  } else {
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(outFile, '[]', 'utf8')
    console.warn('Не удалось импортировать contest-regulations.ts, создан пустой файл:', err.message)
  }
}
