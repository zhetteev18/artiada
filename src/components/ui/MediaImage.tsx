type MediaImageProps = {
  src: string | null | undefined
  alt: string
  className?: string
  fallback?: React.ReactNode
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function MediaImage({
  src,
  alt,
  className = '',
  fallback,
  loading = 'lazy',
  fetchPriority,
}: MediaImageProps) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-ink/5 to-gold/10 text-ink-muted ${className}`}
        role="img"
        aria-label={alt}
      >
        {fallback ?? <span className="text-3xl opacity-50">🖼</span>}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      className={className}
    />
  )
}
