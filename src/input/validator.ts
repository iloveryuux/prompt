import { ValidatorFunction } from '../types'

export const validators: Record<string, ValidatorFunction> = {
  number: (answer: string) => {
    const parsedNumber = Number(answer)
    return Number.isNaN(parsedNumber) ? null : parsedNumber
  },
  boolean: (answer: string) => {
    const lowerAnswer = answer.toLowerCase()
    if (lowerAnswer === 'y') return true
    if (lowerAnswer === 'n') return false
    return null
  }
}
