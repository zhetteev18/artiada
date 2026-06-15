type MobileFormFabProps = {
  onClick: () => void
}

export function MobileFormFab({ onClick }: MobileFormFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="animate-pulse-soft fixed bottom-5 right-4 z-40 flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light px-5 py-3 text-sm font-bold text-ink shadow-glow transition-transform hover:scale-105 active:scale-95 xl:hidden"
      aria-label="Принять участие"
    >
      <span aria-hidden className="text-base">
        ✦
      </span>
      Участие
    </button>
  )
}
