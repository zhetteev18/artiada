import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { applyMediaManifest, type MediaManifest } from '../data/media'
import staticManifest from '../data/media-manifest.json'

const MediaVersionContext = createContext(0)

export function MediaRefreshProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0)

  useEffect(() => {
    fetch('/content/media-manifest.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: MediaManifest | null) => {
        if (data && Array.isArray(data.gallery)) {
          applyMediaManifest(data)
          setVersion((v) => v + 1)
        }
      })
      .catch(() => {
        applyMediaManifest(staticManifest)
      })
  }, [])

  return (
    <MediaVersionContext.Provider value={version}>{children}</MediaVersionContext.Provider>
  )
}

export function useMediaVersion() {
  return useContext(MediaVersionContext)
}
