/**
 * Локальный API для админ-панели: галерея и новости.
 * Запуск: npm run admin  (порт 3001)
 */
import cors from 'cors'
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import multer from 'multer'
import { spawnSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const imagesRoot = path.join(root, 'public', 'images')
const galleryDir = path.join(imagesRoot, 'gallery')
const newsDir = path.join(imagesRoot, 'news')
const newsJsonPath = path.join(root, 'public', 'content', 'news.json')
const festivalCalendarPath = path.join(root, 'public', 'content', 'festival-calendar.json')
const contestResultsPath = path.join(root, 'public', 'content', 'contest-results.json')

const PORT = Number(process.env.ADMIN_PORT) || 3001
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'artiada2025'

const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

function auth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Неверный пароль' })
  }
  next()
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }))
}

function runMediaSync() {
  const r = spawnSync(process.execPath, [path.join(root, 'scripts', 'sync-media.mjs')], {
    cwd: root,
    encoding: 'utf8',
  })
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout)
    throw new Error('sync-media failed')
  }
}

function readNews() {
  if (!fs.existsSync(newsJsonPath)) {
    return []
  }
  return JSON.parse(fs.readFileSync(newsJsonPath, 'utf8'))
}

function writeNews(items) {
  fs.mkdirSync(path.dirname(newsJsonPath), { recursive: true })
  fs.writeFileSync(newsJsonPath, JSON.stringify(items, null, 2), 'utf8')
}

function readJsonArray(filePath) {
  if (!fs.existsSync(filePath)) return []
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  return Array.isArray(data) ? data : []
}

function writeJsonArray(filePath, items) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf8')
}

const storage = multer.diskStorage({
  destination(req, _file, cb) {
    if (req.uploadKind === 'gallery') {
      fs.mkdirSync(galleryDir, { recursive: true })
      cb(null, galleryDir)
      return
    }
    const slug = req.params.slug
    const dir = path.join(newsDir, slug)
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename(_req, file, cb) {
    const safe = file.originalname.replace(/[^\w.\-а-яА-ЯёЁ]/gi, '_')
    cb(null, safe)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase()
    if (!EXT.has(ext)) {
      cb(new Error('Допустимы только изображения'))
      return
    }
    cb(null, true)
  },
})

const app = express()
app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/auth/check', (req, res) => {
  const { token } = req.body || {}
  if (token === ADMIN_TOKEN) res.json({ ok: true })
  else res.status(401).json({ error: 'Неверный пароль' })
})

app.use('/api', auth)

app.get('/api/gallery', (_req, res) => {
  const files = listImages(galleryDir)
  res.json({
    files: files.map((name) => ({
      name,
      url: `/images/gallery/${name}`,
    })),
  })
})

app.post('/api/gallery/upload', (req, _res, next) => {
  req.uploadKind = 'gallery'
  next()
}, upload.array('files', 20), (req, res) => {
  try {
    runMediaSync()
    res.json({ ok: true, uploaded: (req.files || []).map((f) => f.filename) })
  } catch (e) {
    res.status(500).json({ error: String(e.message) })
  }
})

app.delete('/api/gallery/:filename', (req, res) => {
  const file = path.basename(req.params.filename)
  const target = path.join(galleryDir, file)
  if (!fs.existsSync(target)) {
    return res.status(404).json({ error: 'Файл не найден' })
  }
  fs.unlinkSync(target)
  runMediaSync()
  res.json({ ok: true })
})

app.get('/api/news', (_req, res) => {
  res.json(readNews())
})

app.put('/api/news', (req, res) => {
  const items = req.body
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Ожидается массив новостей' })
  }
  writeNews(items)
  res.json({ ok: true, count: items.length })
})

app.get('/api/festival-calendar', (_req, res) => {
  res.json(readJsonArray(festivalCalendarPath))
})

app.put('/api/festival-calendar', (req, res) => {
  const items = req.body
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Ожидается массив событий' })
  }
  writeJsonArray(festivalCalendarPath, items)
  res.json({ ok: true, count: items.length })
})

app.get('/api/contest-results', (_req, res) => {
  res.json(readJsonArray(contestResultsPath))
})

app.put('/api/contest-results', (req, res) => {
  const items = req.body
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Ожидается массив итогов' })
  }
  writeJsonArray(contestResultsPath, items)
  res.json({ ok: true, count: items.length })
})

app.get('/api/news/:slug/images', (req, res) => {
  const slug = req.params.slug
  const folder = path.join(newsDir, slug)
  const legacy = listImages(newsDir).find(
    (f) => path.parse(f).name.toLowerCase() === slug.toLowerCase(),
  )
  const inFolder = fs.existsSync(folder) ? listImages(folder) : []
  const files = []
  if (legacy) files.push({ name: legacy, url: `/images/news/${legacy}`, legacy: true })
  for (const name of inFolder) {
    files.push({ name, url: `/images/news/${slug}/${name}`, legacy: false })
  }
  res.json({ slug, files })
})

app.post('/api/news/:slug/images', (req, _res, next) => {
  req.uploadKind = 'news'
  next()
}, upload.array('files', 20), (req, res) => {
  try {
    runMediaSync()
    res.json({ ok: true, uploaded: (req.files || []).map((f) => f.filename) })
  } catch (e) {
    res.status(500).json({ error: String(e.message) })
  }
})

app.delete('/api/news/:slug/images/:filename', (req, res) => {
  const slug = req.params.slug
  const file = path.basename(req.params.filename)
  const inFolder = path.join(newsDir, slug, file)
  const legacy = path.join(newsDir, file)

  if (fs.existsSync(inFolder)) fs.unlinkSync(inFolder)
  else if (fs.existsSync(legacy) && path.parse(file).name.toLowerCase() === slug.toLowerCase()) {
    fs.unlinkSync(legacy)
  } else {
    return res.status(404).json({ error: 'Файл не найден' })
  }
  runMediaSync()
  res.json({ ok: true })
})

app.post('/api/media/sync', (_req, res) => {
  try {
    runMediaSync()
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: String(e.message) })
  }
})

app.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message || 'Ошибка' })
})

app.listen(PORT, () => {
  console.log(`Админ-API: http://localhost:${PORT}`)
  console.log(`Пароль по умолчанию: ${ADMIN_TOKEN} (задайте ADMIN_TOKEN в .env)`)
})
