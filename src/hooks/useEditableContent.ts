import { useEffect, useState } from 'react'

export function useEditableContent<T>(url: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback)

  useEffect(() => {
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data)) setItems(data as T[])
      })
      .catch(() => {
        /* оставляем fallback-контент */
      })
  }, [url])

  return items
}
