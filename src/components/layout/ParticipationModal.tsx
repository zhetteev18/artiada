import { useEffect } from 'react'
import { ParticipationForm } from '../forms/ParticipationForm'

type ParticipationModalProps = {
  open: boolean
  onClose: () => void
}

export function ParticipationModal({ open, onClose }: ParticipationModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex animate-[fadeIn_0.2s_ease-out] items-end justify-center sm:items-center xl:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="participation-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl animate-[slideUp_0.35s_ease-out] sm:mx-4 sm:max-w-md sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
          aria-label="Закрыть форму"
        >
          ✕
        </button>
        <div id="participation-modal-title" className="sr-only">
          Принять участие
        </div>
        <ParticipationForm variant="modal" onSuccess={onClose} />
      </div>
    </div>
  )
}
