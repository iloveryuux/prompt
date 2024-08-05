import type { ValidatorFunction } from '../types'

export const validators: Record<string, ValidatorFunction> = {
  number: (answer: string): number | null => {
    const parsedNumber = Number(answer)
    return Number.isNaN(parsedNumber) ? null : parsedNumber
  },
  boolean: (answer: string): boolean | null => {
    const lowerAnswer = answer.trim().toLowerCase()
    if (lowerAnswer === 'y') return true
    if (lowerAnswer === 'n') return false
    return null
  }
}
