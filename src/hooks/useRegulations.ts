import { useEffect, useState } from 'react'
import { contestRegulations as staticRegulations, type ContestRegulation } from '../data/contest-regulations'

export function useRegulations(): ContestRegulation[] {
  const [items, setItems] = useState<ContestRegulation[]>(staticRegulations)

  useEffect(() => {
    fetch('/content/contest-regulations.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data as ContestRegulation[])
        }
      })
      .catch(() => {
        // Fallback to static regulations on error
      })
  }, [])

  return items
}
