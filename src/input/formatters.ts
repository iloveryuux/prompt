import type { Format } from '../types'

const formatters: Record<Format, (text: string) => string> = {
  uppercase: text => text.toUpperCase(),
  lowercase: text => text.toLowerCase(),
  capitalize: text =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
  none: text => text
}

export function formatAnswer(
  answer: string | number | boolean,
  format: Format
): string | number | boolean {
  if (typeof answer === 'string') {
    const formatter = formatters[format] || formatters.none
    return formatter(answer)
  }
  return answer
}
