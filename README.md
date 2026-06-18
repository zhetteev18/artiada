# Артиада — современный сайт Мирового Артийского комитета

Редизайн [artiada.tilda.ws](https://artiada.tilda.ws) на React + Vite + Tailwind CSS 4.

## Запуск

```bash
npm install
npm run dev
```

## Фото на сайте

Все изображения — в папке **`public/images/`** (см. `public/images/README.md`).

После добавления или замены файлов:

```bash
npm run media
```

Подробная инструкция: `docs/КАК-ДОБАВИТЬ-ФОТО.md`

Сборка для продакшена:

```bash
npm run build
npm run preview
```

## Форма «Принять участие»

По умолчанию работает в **демо-режиме** (заявка логируется в консоль).

Для реальной отправки через [Formspree](https://formspree.io):

1. Создайте форму на Formspree
2. Скопируйте `.env.example` в `.env`
3. Укажите `VITE_FORMSPREE_ID=ваш_id`

## Структура

- `src/data/content.ts` — весь текстовый контент
- `src/components/sections/` — секции страницы
- `src/components/forms/ParticipationForm.tsx` — форма с валидацией

## Адаптивность

- **Desktop (1280px+)**: форма закреплена справа (sticky)
- **Tablet/Mobile**: форма внизу страницы + FAB-кнопка и модальное окно

## Требования

Node.js 20+ рекомендуется (Vite 8). На Node 18 возможны предупреждения.
