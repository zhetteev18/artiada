/**
 * Production-сервер: статический сайт + админ-API.
 * Railway: npm run build && npm start
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createAdminApp } from './create-admin-app.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const publicDir = path.join(root, 'public')

const PORT = Number(process.env.PORT) || 3001
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'artiada2025'

if (!fs.existsSync(distDir)) {
  console.error('Папка dist/ не найдена. Сначала выполните: npm run build')
  process.exit(1)
}

const app = createAdminApp({ adminToken: ADMIN_TOKEN })

// Актуальный контент и загруженные фото (обновляются через админку)
app.use('/content', express.static(path.join(publicDir, 'content'), { maxAge: '60s' }))
app.use('/images', express.static(path.join(publicDir, 'images'), { maxAge: '1d' }))

// Собранный фронтенд
app.use(express.static(distDir, { maxAge: '1h' }))

// React Router: /admin и остальные маршруты
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Сайт и админ-API: http://0.0.0.0:${PORT}`)
  console.log(`Админ-панель: /admin`)
  if (!process.env.ADMIN_TOKEN) {
    console.log(`Пароль по умолчанию: ${ADMIN_TOKEN} (задайте ADMIN_TOKEN в Railway)`)
  }
})
