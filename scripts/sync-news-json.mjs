/**
 * Экспорт новостей из src/data/news.ts → public/content/news.json
 * Требует запуска через: node --import tsx/esm scripts/sync-news-json.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'content')
const outFile = path.join(outDir, 'news.json')

try {
  const { news } = await import('../src/data/news.ts')

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(news, null, 2), 'utf8')
  console.log('Новости экспортированы:', outFile, `(${news.length} шт.)`)
} catch (err) {
  // Если уже есть news.json — не перезаписываем, просто пропускаем
  if (fs.existsSync(outFile)) {
    console.log('Используем существующий news.json')
  } else {
    // Создаём пустой массив чтобы сайт не упал
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(outFile, '[]', 'utf8')
    console.warn('Не удалось импортировать news.ts, создан пустой news.json:', err.message)
  }
}
