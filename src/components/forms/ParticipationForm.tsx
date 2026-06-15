import { useState, type FormEvent } from 'react'
import { Button } from '../ui/Button'

type ParticipationFormProps = {
  variant?: 'sidebar' | 'inline' | 'modal'
  onSuccess?: () => void
}

type FormState = {
  name: string
  phone: string
  email: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const FORM_EMAIL =
  import.meta.env.VITE_FORM_EMAIL?.trim() || '07baa@mail.ru'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
  : null

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(FORM_EMAIL)}`

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  const name = values.name.trim()
  const phone = values.phone.replace(/\s/g, '')

  if (!name || name.length < 2) {
    errors.name = 'Укажите имя (минимум 2 символа)'
  }

  if (!phone || phone.length < 10) {
    errors.phone = 'Укажите корректный номер телефона'
  }

  if (values.email.trim()) {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    if (!emailOk) errors.email = 'Некорректный email'
  }

  return errors
}

export function ParticipationForm({
  variant = 'sidebar',
  onSuccess,
}: ParticipationFormProps) {
  const [values, setValues] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const submitFormspree = async (payload: FormState) => {
    const res = await fetch(FORMSPREE_ENDPOINT!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        email: payload.email.trim() || undefined,
        _subject: 'Заявка: Принять участие — Артиада',
      }),
    })
    return res.ok
  }

  const submitFormSubmit = async (payload: FormState) => {
    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        email: payload.email.trim() || '—',
        _subject: 'Заявка: Принять участие — Артиада',
        _template: 'table',
        _captcha: 'false',
      }),
    })
    return res.ok
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const ok = FORMSPREE_ENDPOINT
        ? await submitFormspree(values)
        : await submitFormSubmit(values)

      if (!ok) throw new Error('submit failed')

      setStatus('success')
      setValues({ name: '', phone: '', email: '' })
      onSuccess?.()
    } catch {
      setStatus('error')
      setMessage(
        'Не удалось отправить заявку. Попробуйте позже или напишите на 07baa@mail.ru',
      )
    }
  }

  const wrapperClass =
    variant === 'sidebar'
      ? 'glass rounded-2xl p-5 shadow-card-hover'
      : variant === 'modal'
        ? 'p-1'
        : 'glass rounded-2xl p-6 shadow-card'

  if (status === 'success') {
    return (
      <div className={wrapperClass} role="status">
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
            ✓
          </div>
          <h3 className="text-lg font-bold text-ink">Заявка отправлена!</h3>
          <p className="text-sm text-ink-muted">
            Мы свяжемся с вами в ближайшее время. Спасибо за интерес к Артиаде.
          </p>
          <Button
            variant="secondary"
            className="mt-2 w-full"
            onClick={() => setStatus('idle')}
          >
            Отправить ещё
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={wrapperClass}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-ink">Принять участие</h3>
        <p className="mt-1 text-sm text-ink-muted">
          Оставьте заявку — мы свяжемся с вами
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label htmlFor={`name-${variant}`} className="mb-1 block text-xs font-medium text-ink-muted">
            Имя <span className="text-red-500">*</span>
          </label>
          <input
            id={`name-${variant}`}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange('name')}
            className={`w-full min-h-11 rounded-xl border bg-white/90 px-3 text-sm transition-all focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/15 ${
              errors.name ? 'border-red-400' : 'border-ink/10'
            }`}
            placeholder="Ваше имя"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={`phone-${variant}`} className="mb-1 block text-xs font-medium text-ink-muted">
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            id={`phone-${variant}`}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange('phone')}
            className={`w-full min-h-11 rounded-xl border bg-white/80 px-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 ${
              errors.phone ? 'border-red-400' : 'border-ink/10'
            }`}
            placeholder="+7 (___) ___-__-__"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor={`email-${variant}`} className="mb-1 block text-xs font-medium text-ink-muted">
            Email <span className="text-ink-muted/70">(необязательно)</span>
          </label>
          <input
            id={`email-${variant}`}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange('email')}
            className={`w-full min-h-11 rounded-xl border bg-white/80 px-3 text-sm transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 ${
              errors.email ? 'border-red-400' : 'border-ink/10'
            }`}
            placeholder="email@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        {message && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
            {message}
          </p>
        )}

        <Button type="submit" variant="gold" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Отправка…' : 'Отправить заявку'}
        </Button>
      </form>
    </div>
  )
}
