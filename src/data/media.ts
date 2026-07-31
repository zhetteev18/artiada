import staticManifest from './media-manifest.json'
import { cofoundersDocs } from './cofounders-docs'

export type MediaManifest = typeof staticManifest

let currentManifest: MediaManifest = staticManifest

export function applyMediaManifest(next: MediaManifest) {
  currentManifest = next
}

function getManifest() {
  return currentManifest
}

export function getHeroImage(): string | null {
  return getManifest().hero
}

export function getPersonImage(id: 'tarbokov' | 'betuaganov'): string | null {
  return getManifest().people[id] ?? null
}

export function getNewsImages(slug: string): string[] {
  const key = slug.toLowerCase()
  const entry = (getManifest().news as Record<string, string | string[]>)[key]
  if (!entry) return []
  return Array.isArray(entry) ? entry : [entry]
}

export function getNewsImage(slug: string): string | null {
  return getNewsImages(slug)[0] ?? null
}

export function getRegulationImages(id: string): string[] {
  const key = id.toLowerCase()
  const entry = (getManifest().regulations as Record<string, string | string[]>)?.[key]
  if (!entry) return []
  return Array.isArray(entry) ? entry : [entry]
}

export function getRegulationImage(id: string): string | null {
  return getRegulationImages(id)[0] ?? null
}

export function getGalleryImages() {
  return getManifest().gallery.map((file, i) => ({
    id: i + 1,
    src: `/images/gallery/${file}`,
    alt: `Артиада — фото ${i + 1}`,
  }))
}

export function galleryImagePath(index: number): string {
  const file = getManifest().gallery[index - 1]
  return file ? `/images/gallery/${file}` : ''
}

export function getCofounderDocs() {
  return cofoundersDocs.map((meta, index) => ({
    ...meta,
    src: getManifest().cofounders[index] ?? null,
  }))
}

export function getVideoCovers() {
  return getManifest().videos
}
