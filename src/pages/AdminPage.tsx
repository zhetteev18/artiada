import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { NewsItem } from '../data/news'
import type { ContestResult, FestivalEvent } from '../data/editable-content'

const TOKEN_KEY = 'artiada_admin_token'

type Tab = 'news' | 'gallery' | 'calendar' | 'results'

type GalleryFile = { name: string; url: string }

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

async function api<T>(
  path: string,
  token: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      ...authHeaders(token),
      ...(init?.headers || {}),
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Ошибка запроса')
  return data as T
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || `news-${Date.now()}`
}

export function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [loginInput, setLoginInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState<Tab>('news')
  const [news, setNews] = useState<NewsItem[]>([])
  const [gallery, setGallery] = useState<GalleryFile[]>([])
  const [calendar, setCalendar] = useState<FestivalEvent[]>([])
  const [results, setResults] = useState<ContestResult[]>([])
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const [editingEvent, setEditingEvent] = useState<FestivalEvent | null>(null)
  const [editingResult, setEditingResult] = useState<ContestResult | null>(null)

  const loadNews = useCallback(async () => {
    const data = await api<NewsItem[]>('/api/news', token)
    setNews(data)
  }, [token])

  const loadGallery = useCallback(async () => {
    const data = await api<{ files: GalleryFile[] }>('/api/gallery', token)
    setGallery(data.files)
  }, [token])

  const loadCalendar = useCallback(async () => {
    const data = await api<FestivalEvent[]>('/api/festival-calendar', token)
    setCalendar(data)
  }, [token])

  const loadResults = useCallback(async () => {
    const data = await api<ContestResult[]>('/api/contest-results', token)
    setResults(data)
  }, [token])

  useEffect(() => {
    if (!token) return
    loadNews().catch(() => setStatus('Не удалось загрузить данные. Проверьте, что сервер запущен.'))
    loadGallery().catch(() => {})
    loadCalendar().catch(() => {})
    loadResults().catch(() => {})
  }, [token, loadNews, loadGallery, loadCalendar, loadResults])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch('/api/auth/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: loginInput }),
      })
      if (!res.ok) throw new Error('Неверный пароль')
      sessionStorage.setItem(TOKEN_KEY, loginInput)
      setToken(loginInput)
    } catch {
      setLoginError('Неверный пароль. По умолчанию: artiada2025')
    }
  }

  const saveNews = async (items: NewsItem[]) => {
    setBusy(true)
    setStatus('')
    try {
      await api('/api/news', token, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      })
      setNews(items)
      setStatus('Новости сохранены. Обновите главную страницу сайта.')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Ошибка сохранения')
    } finally {
      setBusy(false)
    }
  }

  const saveCalendar = async (items: FestivalEvent[]) => {
    setBusy(true)
    setStatus('')
    try {
      await api('/api/festival-calendar', token, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      })
      setCalendar(items)
      setStatus('Календарь фестивалей сохранён.')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Ошибка сохранения')
    } finally {
      setBusy(false)
    }
  }

  const saveResults = async (items: ContestResult[]) => {
    setBusy(true)
    setStatus('')
    try {
      await api('/api/contest-results', token, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      })
      setResults(items)
      setStatus('Итоги конкурсов сохранены.')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Ошибка сохранения')
    } finally {
      setBusy(false)
    }
  }

  const uploadGallery = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    const fd = new FormData()
    Array.from(files).forEach((f) => fd.append('files', f))
    try {
      await fetch('/api/gallery/upload', {
        method: 'POST',
        headers: authHeaders(token),
        body: fd,
      }).then(async (r) => {
        if (!r.ok) {
          const d = await r.json()
          throw new Error(d.error || 'Ошибка загрузки')
        }
      })
      await loadGallery()
      setStatus('Фото добавлены в галерею')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Ошибка')
    } finally {
      setBusy(false)
    }
  }

  const deleteGallery = async (name: string) => {
    if (!confirm(`Удалить ${name}?`)) return
    setBusy(true)
    try {
      await api(`/api/gallery/${encodeURIComponent(name)}`, token, { method: 'DELETE' })
      await loadGallery()
      setStatus('Фото удалено')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Ошибка')
    } finally {
      setBusy(false)
    }
  }

  const uploadNewsImages = async (slug: string, files: FileList | null) => {
    if (!files?.length) return
    const fd = new FormData()
    Array.from(files).forEach((f) => fd.append('files', f))
    setBusy(true)
    try {
      await fetch(`/api/news/${encodeURIComponent(slug)}/images`, {
        method: 'POST',
        headers: authHeaders(token),
        body: fd,
      }).then(async (r) => {
        if (!r.ok) {
          const d = await r.json()
          throw new Error(d.error || 'Ошибка')
        }
      })
      setStatus('Фото новости загружены')
      if (editing?.slug === slug) setEditing({ ...editing })
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Ошибка')
    } finally {
      setBusy(false)
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 shadow-lg"
        >
          <h1 className="text-xl font-bold text-ink">Админ-панель Артиады</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Редактирование новостей, галереи, календаря и итогов. Запустите{' '}
            <code className="text-xs">npm run dev:full</code>
          </p>
          <label className="mt-6 block text-xs font-medium text-ink-muted">Пароль</label>
          <input
            type="password"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            className="mt-1 w-full min-h-11 rounded-xl border border-ink/10 px-3 text-sm"
            autoComplete="current-password"
          />
          {loginError && <p className="mt-2 text-xs text-red-600">{loginError}</p>}
          <button
            type="submit"
            className="mt-4 w-full min-h-11 rounded-xl bg-ink text-sm font-semibold text-white"
          >
            Войти
          </button>
          <Link to="/" className="mt-4 block text-center text-sm text-gold hover:underline">
            ← На сайт
          </Link>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <h1 className="text-lg font-bold text-ink">Админ-панель</h1>
            <p className="text-xs text-ink-muted">Галерея и новости</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/"
              className="min-h-10 rounded-lg border border-ink/10 px-4 text-sm font-medium leading-10"
            >
              На сайт
            </Link>
            <button
              type="button"
              className="min-h-10 rounded-lg border border-ink/10 px-4 text-sm"
              onClick={() => {
                sessionStorage.removeItem(TOKEN_KEY)
                setToken('')
              }}
            >
              Выйти
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 pb-3">
          {(['news', 'gallery', 'calendar', 'results'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                tab === t ? 'bg-ink text-white' : 'bg-ink/5 text-ink'
              }`}
            >
              {t === 'news'
                ? 'Новости'
                : t === 'gallery'
                  ? 'Галерея'
                  : t === 'calendar'
                    ? 'Календарь'
                    : 'Итоги'}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {status && (
          <p className="mb-4 rounded-lg bg-gold/10 px-4 py-2 text-sm text-ink">{status}</p>
        )}

        {tab === 'gallery' && (
          <section>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white">
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                disabled={busy}
                onChange={(e) => {
                  uploadGallery(e.target.files)
                  e.target.value = ''
                }}
              />
              Загрузить фото
            </label>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {gallery.map((f) => (
                <div key={f.name} className="overflow-hidden rounded-xl border border-ink/10">
                  <img src={f.url} alt="" className="aspect-square w-full object-cover" />
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => deleteGallery(f.name)}
                    className="w-full py-2 text-xs text-red-600 hover:bg-red-50"
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
            {gallery.length === 0 && (
              <p className="mt-4 text-sm text-ink-muted">Галерея пуста — загрузите первые фото.</p>
            )}
          </section>
        )}

        {tab === 'news' && !editing && (
          <section>
            <button
              type="button"
              disabled={busy}
              className="rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-ink"
              onClick={() =>
                setEditing({
                  id: `new-${Date.now()}`,
                  slug: '',
                  title: '',
                  date: new Date().toISOString().slice(0, 10),
                  excerpt: '',
                  body: '',
                })
              }
            >
              + Добавить новость
            </button>
            <ul className="mt-6 space-y-2">
              {news.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-ink/10 bg-white px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{item.title}</p>
                    <p className="text-xs text-ink-muted">{item.date} · {item.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-sm text-gold"
                      onClick={() => setEditing(item)}
                    >
                      Редактировать
                    </button>
                    <button
                      type="button"
                      className="text-sm text-red-600"
                      onClick={() => {
                        if (!confirm('Удалить новость?')) return
                        void saveNews(news.filter((n) => n.id !== item.id))
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'news' && editing && (
          <NewsEditor
            item={editing}
            busy={busy}
            token={token}
            onCancel={() => setEditing(null)}
            onSave={async (item) => {
              const slug = item.slug.trim() || slugify(item.title)
              const normalized = { ...item, slug, id: item.id || slug }
              const idx = news.findIndex((n) => n.id === normalized.id)
              const next =
                idx >= 0
                  ? news.map((n, i) => (i === idx ? normalized : n))
                  : [normalized, ...news]
              await saveNews(next)
              setEditing(null)
            }}
            onUploadImages={uploadNewsImages}
          />
        )}

        {tab === 'calendar' && !editingEvent && (
          <section>
            <button
              type="button"
              disabled={busy}
              className="rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-ink"
              onClick={() =>
                setEditingEvent({
                  id: `event-${Date.now()}`,
                  title: '',
                  date: new Date().toISOString().slice(0, 10),
                  place: '',
                  description: '',
                  status: 'planned',
                })
              }
            >
              + Добавить событие
            </button>
            <ul className="mt-6 space-y-2">
              {calendar.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-ink/10 bg-white px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{item.title}</p>
                    <p className="text-xs text-ink-muted">
                      {item.date} · {item.place || 'место не указано'} · {item.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-sm text-gold"
                      onClick={() => setEditingEvent(item)}
                    >
                      Редактировать
                    </button>
                    <button
                      type="button"
                      className="text-sm text-red-600"
                      onClick={() => {
                        if (!confirm('Удалить событие?')) return
                        void saveCalendar(calendar.filter((n) => n.id !== item.id))
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'calendar' && editingEvent && (
          <FestivalEventEditor
            item={editingEvent}
            busy={busy}
            onCancel={() => setEditingEvent(null)}
            onSave={async (item) => {
              const normalized = { ...item, id: item.id || `event-${Date.now()}` }
              const idx = calendar.findIndex((n) => n.id === normalized.id)
              const next =
                idx >= 0
                  ? calendar.map((n, i) => (i === idx ? normalized : n))
                  : [normalized, ...calendar]
              await saveCalendar(next)
              setEditingEvent(null)
            }}
          />
        )}

        {tab === 'results' && !editingResult && (
          <section>
            <button
              type="button"
              disabled={busy}
              className="rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-ink"
              onClick={() =>
                setEditingResult({
                  id: `result-${Date.now()}`,
                  title: '',
                  date: new Date().toISOString().slice(0, 10),
                  nomination: '',
                  winners: '',
                  description: '',
                })
              }
            >
              + Добавить итог
            </button>
            <ul className="mt-6 space-y-2">
              {results.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-ink/10 bg-white px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{item.title}</p>
                    <p className="text-xs text-ink-muted">
                      {item.date} · {item.nomination || 'номинация не указана'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-sm text-gold"
                      onClick={() => setEditingResult(item)}
                    >
                      Редактировать
                    </button>
                    <button
                      type="button"
                      className="text-sm text-red-600"
                      onClick={() => {
                        if (!confirm('Удалить итог?')) return
                        void saveResults(results.filter((n) => n.id !== item.id))
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'results' && editingResult && (
          <ContestResultEditor
            item={editingResult}
            busy={busy}
            onCancel={() => setEditingResult(null)}
            onSave={async (item) => {
              const normalized = { ...item, id: item.id || `result-${Date.now()}` }
              const idx = results.findIndex((n) => n.id === normalized.id)
              const next =
                idx >= 0
                  ? results.map((n, i) => (i === idx ? normalized : n))
                  : [normalized, ...results]
              await saveResults(next)
              setEditingResult(null)
            }}
          />
        )}
      </main>
    </div>
  )
}

function NewsEditor({
  item,
  busy,
  token,
  onCancel,
  onSave,
  onUploadImages,
}: {
  item: NewsItem
  busy: boolean
  token: string
  onCancel: () => void
  onSave: (item: NewsItem) => Promise<void>
  onUploadImages: (slug: string, files: FileList | null) => Promise<void>
}) {
  const [draft, setDraft] = useState(item)
  const [images, setImages] = useState<{ name: string; url: string }[]>([])

  const slug = draft.slug.trim() || slugify(draft.title)

  const loadImages = useCallback(async () => {
    if (!slug) return
    try {
      const data = await api<{ files: { name: string; url: string }[] }>(
        `/api/news/${encodeURIComponent(slug)}/images`,
        token,
      )
      setImages(data.files)
    } catch {
      setImages([])
    }
  }, [slug, token])

  useEffect(() => {
    void loadImages()
  }, [loadImages])

  const deleteImage = async (filename: string) => {
    if (!confirm('Удалить фото?')) return
    await api(
      `/api/news/${encodeURIComponent(slug)}/images/${encodeURIComponent(filename)}`,
      token,
      { method: 'DELETE' },
    )
    await loadImages()
  }

  return (
    <section className="rounded-2xl border border-ink/10 bg-white p-6">
      <h2 className="text-lg font-bold">{item.title ? 'Редактирование' : 'Новая новость'}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Заголовок" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <Field label="Дата (ГГГГ-ММ-ДД)" value={draft.date} onChange={(v) => setDraft({ ...draft, date: v })} />
        <Field
          label="Slug (имя папки для фото)"
          value={draft.slug}
          onChange={(v) => setDraft({ ...draft, slug: v })}
          hint="Латиница, например: ogni-dagestana"
        />
      </div>
      <Field
        className="mt-4"
        label="Краткое описание"
        value={draft.excerpt}
        onChange={(v) => setDraft({ ...draft, excerpt: v })}
        multiline
      />
      <Field
        className="mt-4"
        label="Полный текст"
        value={draft.body}
        onChange={(v) => setDraft({ ...draft, body: v })}
        multiline
        rows={8}
      />

      <div className="mt-6">
        <p className="text-sm font-medium text-ink">Фотографии новости</p>
        <p className="text-xs text-ink-muted">
          Папка: public/images/news/{slug || '…'}/
        </p>
        <label className="mt-2 inline-flex cursor-pointer rounded-lg bg-ink/5 px-4 py-2 text-sm">
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            disabled={busy || !slug}
            onChange={(e) => {
              void onUploadImages(slug, e.target.files).then(() => loadImages())
              e.target.value = ''
            }}
          />
          Загрузить фото (можно несколько)
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((img) => (
            <div key={img.url} className="relative h-20 w-20 overflow-hidden rounded-lg">
              <img src={img.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                className="absolute inset-x-0 bottom-0 bg-red-600/90 py-0.5 text-[10px] text-white"
                onClick={() => void deleteImage(img.name)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy || !draft.title.trim()}
          className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          onClick={() => void onSave({ ...draft, slug })}
        >
          Сохранить
        </button>
        <button type="button" className="rounded-xl border px-5 py-2.5 text-sm" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </section>
  )
}

function FestivalEventEditor({
  item,
  busy,
  onCancel,
  onSave,
}: {
  item: FestivalEvent
  busy: boolean
  onCancel: () => void
  onSave: (item: FestivalEvent) => Promise<void>
}) {
  const [draft, setDraft] = useState(item)

  return (
    <section className="rounded-2xl border border-ink/10 bg-white p-6">
      <h2 className="text-lg font-bold">
        {item.title ? 'Редактирование события' : 'Новое событие'}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Название" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <Field label="Дата (ГГГГ-ММ-ДД)" value={draft.date} onChange={(v) => setDraft({ ...draft, date: v })} />
        <Field label="Место" value={draft.place} onChange={(v) => setDraft({ ...draft, place: v })} />
        <label className="block">
          <span className="text-xs font-medium text-ink-muted">Статус</span>
          <select
            value={draft.status}
            onChange={(e) =>
              setDraft({ ...draft, status: e.target.value as FestivalEvent['status'] })
            }
            className="mt-1 w-full rounded-xl border border-ink/10 px-3 py-2 text-sm focus:border-gold focus:outline-none"
          >
            <option value="planned">Планируется</option>
            <option value="open">Приём заявок</option>
            <option value="done">Завершено</option>
          </select>
        </label>
      </div>
      <Field
        className="mt-4"
        label="Описание"
        value={draft.description}
        onChange={(v) => setDraft({ ...draft, description: v })}
        multiline
        rows={5}
      />
      <EditorActions
        busy={busy}
        disabled={!draft.title.trim()}
        onCancel={onCancel}
        onSave={() => onSave(draft)}
      />
    </section>
  )
}

function ContestResultEditor({
  item,
  busy,
  onCancel,
  onSave,
}: {
  item: ContestResult
  busy: boolean
  onCancel: () => void
  onSave: (item: ContestResult) => Promise<void>
}) {
  const [draft, setDraft] = useState(item)

  return (
    <section className="rounded-2xl border border-ink/10 bg-white p-6">
      <h2 className="text-lg font-bold">
        {item.title ? 'Редактирование итога' : 'Новый итог конкурса'}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Название" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <Field label="Дата (ГГГГ-ММ-ДД)" value={draft.date} onChange={(v) => setDraft({ ...draft, date: v })} />
        <Field
          label="Номинация"
          value={draft.nomination}
          onChange={(v) => setDraft({ ...draft, nomination: v })}
        />
      </div>
      <Field
        className="mt-4"
        label="Победители / лауреаты"
        value={draft.winners}
        onChange={(v) => setDraft({ ...draft, winners: v })}
        multiline
        rows={5}
      />
      <Field
        className="mt-4"
        label="Описание"
        value={draft.description}
        onChange={(v) => setDraft({ ...draft, description: v })}
        multiline
        rows={5}
      />
      <EditorActions
        busy={busy}
        disabled={!draft.title.trim()}
        onCancel={onCancel}
        onSave={() => onSave(draft)}
      />
    </section>
  )
}

function EditorActions({
  busy,
  disabled,
  onCancel,
  onSave,
}: {
  busy: boolean
  disabled: boolean
  onCancel: () => void
  onSave: () => void
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button
        type="button"
        disabled={busy || disabled}
        className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        onClick={onSave}
      >
        Сохранить
      </button>
      <button type="button" className="rounded-xl border px-5 py-2.5 text-sm" onClick={onCancel}>
        Отмена
      </button>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  multiline,
  rows = 3,
  hint,
  className = '',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  rows?: number
  hint?: string
  className?: string
}) {
  const cls =
    'mt-1 w-full rounded-xl border border-ink/10 px-3 py-2 text-sm focus:border-gold focus:outline-none'
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-medium text-ink-muted">{label}</span>
      {hint && <span className="ml-1 text-[10px] text-ink-muted/80">({hint})</span>}
      {multiline ? (
        <textarea
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  )
}
