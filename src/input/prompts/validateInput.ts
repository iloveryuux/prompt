import type { Format } from '../../types'

import { InvalidEntryMessage } from '../core/notifications'
import { createReadline } from '../core/readline'
import { formatters } from '../core/formatters'
import { handleError } from '../core/error'
import { promptUser } from './prompt'

import { brightCyan } from '@ryuux/palette'

export async function getValidatedInput<T>(
  question: string,
  validator?: (input: string) => T | null,
  timeout: number = 30 * 1000,
  format: Format = 'none',
  defaultValue?: T
): Promise<T> {
  const rl = createReadline()

  const handleDefaultValue = () => {
    rl.close()
    return formatters[format](defaultValue as unknown as string) as T
  }

  const handleInvalidInput = async () => {
    await InvalidEntryMessage()
    return getValidatedInput(question, validator, timeout, format, defaultValue)
  }

  try {
    console.log(brightCyan(question))
    const input = await promptUser(
      rl,
      timeout,
      typeof defaultValue === 'string' ? defaultValue : ''
    )
    const trimmedInput = input.trim()

    if (!trimmedInput) {
      return defaultValue !== undefined
        ? handleDefaultValue()
        : handleInvalidInput()
    }

    const validatedInput = validator
      ? validator(trimmedInput)
      : (trimmedInput as unknown as T)

    if (validatedInput !== null) {
      rl.close()
      return formatters[format](validatedInput as unknown as string) as T
    }

    return defaultValue !== undefined
      ? handleDefaultValue()
      : handleInvalidInput()
  } catch (error) {
    handleError(error as Error)
    return defaultValue !== undefined
      ? handleDefaultValue()
      : Promise.reject(error)
  }
}
