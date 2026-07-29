/**
 * Сканирует public/images/ и генерирует src/data/media-manifest.json
 * Запуск: npm run media
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const imagesRoot = path.join(root, 'public', 'images')
const outFile = path.join(root, 'src', 'data', 'media-manifest.json')
const publicOutFile = path.join(root, 'public', 'content', 'media-manifest.json')

const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

const PEOPLE_IDS = ['tarbokov', 'betuaganov']

function listImages(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }))
}

function findByBaseName(dir, baseName) {
  const files = listImages(dir)
  const lower = baseName.toLowerCase()
  const match = files.find((f) => path.parse(f).name.toLowerCase() === lower)
  if (!match) return null
  return `/images/${path.relative(imagesRoot, path.join(dir, match)).replace(/\\/g, '/')}`
}

function toUrl(dir, filename) {
  const rel = path.relative(imagesRoot, path.join(dir, filename))
  return `/images/${rel.replace(/\\/g, '/')}`
}

function scanHero() {
  const heroDir = path.join(imagesRoot, 'hero')
  const inHero = listImages(heroDir)
  if (inHero.length > 0) {
    const preferred = inHero.find((f) => /^hero\./i.test(f)) || inHero[0]
    return toUrl(heroDir, preferred)
  }
  for (const name of ['hero-bg', 'hero', 'background', 'fon']) {
    for (const ext of EXT) {
      const p = path.join(imagesRoot, `${name}${ext}`)
      if (fs.existsSync(p)) return `/images/${name}${ext}`
    }
  }
  return null
}

function scanPeople() {
  const dir = path.join(imagesRoot, 'people')
  const result = {}
  for (const id of PEOPLE_IDS) {
    result[id] = findByBaseName(dir, id)
  }
  return result
}

function scanCofounders() {
  const dir = path.join(imagesRoot, 'cofounders')
  return listImages(dir).map((f) => toUrl(dir, f))
}

function scanGallery() {
  const dir = path.join(imagesRoot, 'gallery')
  return listImages(dir).map((f) => f)
}

function scanNews() {
  const dir = path.join(imagesRoot, 'news')
  const result = {}
  if (!fs.existsSync(dir)) return result

  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      const slug = entry.toLowerCase()
      const images = listImages(full).map((f) => toUrl(full, f))
      if (images.length > 0) result[slug] = images
      continue
    }
    const ext = path.extname(entry).toLowerCase()
    if (!EXT.has(ext)) continue
    const slug = path.parse(entry).name.toLowerCase()
    if (!result[slug]) result[slug] = [toUrl(dir, entry)]
  }

  return result
}

function scanVideos() {
  const dir = path.join(imagesRoot, 'videos')
  return listImages(dir).map((f) => ({
    file: f,
    src: toUrl(dir, f),
  }))
}

function ensureFolders() {
  const folders = ['hero', 'people', 'cofounders', 'news', 'gallery', 'videos']
  for (const f of folders) {
    const p = path.join(imagesRoot, f)
    fs.mkdirSync(p, { recursive: true })
  }
}

try {
  ensureFolders()

  const manifest = {
    generatedAt: new Date().toISOString(),
    hero: scanHero(),
    people: scanPeople(),
    cofounders: scanCofounders(),
    gallery: scanGallery(),
    news: scanNews(),
    videos: scanVideos(),
  }

  fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2), 'utf8')
  fs.mkdirSync(path.dirname(publicOutFile), { recursive: true })
  fs.writeFileSync(publicOutFile, JSON.stringify(manifest, null, 2), 'utf8')

  console.log('Медиа обновлено:', outFile)
  console.log('Публичный манифест:', publicOutFile)
  console.log({
    hero: manifest.hero ? '✓' : '— положите файл в public/images/hero/',
    people: Object.values(manifest.people).filter(Boolean).length + '/' + PEOPLE_IDS.length,
    cofounders: manifest.cofounders.length,
    gallery: manifest.gallery.length,
    news: Object.keys(manifest.news).length,
    videos: manifest.videos.length,
  })
} catch (err) {
  console.warn('sync-media: не удалось обновить манифест:', err.message)
  // Если манифесты уже есть — не трогаем, билд продолжится
  if (!fs.existsSync(outFile)) {
    const empty = { generatedAt: new Date().toISOString(), hero: null, people: {}, cofounders: [], gallery: [], news: {}, videos: [] }
    fs.mkdirSync(path.dirname(outFile), { recursive: true })
    fs.writeFileSync(outFile, JSON.stringify(empty, null, 2), 'utf8')
    fs.mkdirSync(path.dirname(publicOutFile), { recursive: true })
    fs.writeFileSync(publicOutFile, JSON.stringify(empty, null, 2), 'utf8')
  }
}

