/**
 * Локальный API для админ-панели: галерея и новости.
 * Запуск: npm run admin  (порт 3001)
 */
import { createAdminApp } from './create-admin-app.mjs'

const PORT = Number(process.env.ADMIN_PORT) || 3001
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'artiada2025'

const app = createAdminApp({ adminToken: ADMIN_TOKEN })

app.listen(PORT, () => {
  console.log(`Админ-API: http://localhost:${PORT}`)
  console.log(`Пароль по умолчанию: ${ADMIN_TOKEN} (задайте ADMIN_TOKEN в .env)`)
})
