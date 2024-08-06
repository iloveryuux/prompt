import type { Format } from '../../types'

export const formatters: Record<Format, (text: string) => string> = {
  uppercase: text => text.toUpperCase(),
  lowercase: text => text.toLowerCase(),
  capitalize: text =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
  none: text => text
}
