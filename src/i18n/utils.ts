import { ui, type Lang } from './ui'

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return (ui[lang] as Record<string, string>)?.[key]
      ?? (ui.zh as Record<string, string>)?.[key]
      ?? key
  }
}
