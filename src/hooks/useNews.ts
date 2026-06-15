import { useEffect, useState } from 'react'
import { news as staticNews, type NewsItem } from '../data/news'

export function useNews(): NewsItem[] {
  const [items, setItems] = useState<NewsItem[]>(staticNews)

  useEffect(() => {
    fetch('/content/news.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data as NewsItem[])
        }
      })
      .catch(() => {
        /* остаёмся на статических новостях */
      })
  }, [])

  return items
}
