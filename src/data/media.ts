import manifest from './media-manifest.json'
import { cofoundersDocs } from './cofounders-docs'

export type MediaManifest = typeof manifest

export const media = manifest

export function getHeroImage(): string | null {
  return media.hero
}

export function getPersonImage(id: 'tarbokov' | 'betuaganov'): string | null {
  return media.people[id] ?? null
}

export function getNewsImages(slug: string): string[] {
  const key = slug.toLowerCase()
  const entry = (media.news as Record<string, string | string[]>)[key]
  if (!entry) return []
  return Array.isArray(entry) ? entry : [entry]
}

export function getNewsImage(slug: string): string | null {
  return getNewsImages(slug)[0] ?? null
}

export function getGalleryImages() {
  return media.gallery.map((file, i) => ({
    id: i + 1,
    src: `/images/gallery/${file}`,
    alt: `Артиада — фото ${i + 1}`,
  }))
}

export function galleryImagePath(index: number): string {
  const file = media.gallery[index - 1]
  return file ? `/images/gallery/${file}` : ''
}

export const galleryImages = getGalleryImages()

export function getCofounderDocs() {
  return cofoundersDocs.map((meta, index) => ({
    ...meta,
    src: media.cofounders[index] ?? null,
  }))
}

export function getVideoCovers() {
  return media.videos
}
