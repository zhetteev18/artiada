type MobileFormFabProps = {
  onClick: () => void
}

export function MobileFormFab({ onClick }: MobileFormFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 right-4 z-40 flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-card transition-transform active:scale-95 xl:hidden"
      aria-label="Принять участие"
    >
      Заявка
    </button>
  )
}
