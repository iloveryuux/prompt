import type { InputConfig } from '../types'

import { getValidatedInput } from './prompts/validateInput'
import { validators } from './core/validators'

export async function input<T>(
  question: string,
  options: InputConfig<T> = {}
): Promise<T> {
  const { type, timeout, format, default: defaultValue } = options

  const formattedQuestion = type === 'boolean' ? `${question} (y/n):` : question
  const validator = type
    ? (validators[type] as (input: string) => T | null)
    : undefined

  return getValidatedInput(
    formattedQuestion,
    validator,
    timeout,
    format,
    defaultValue
  )
}
