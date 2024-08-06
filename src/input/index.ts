import type { InputConfig, Validator, Format } from '../types'

import { brightCyan, red } from '@ryuux/palette'
import { TIMEOUT_MS } from '../shared/constants'
import { sleep } from '../shared/utils'

import { createReadline } from './readline'
import { formatAnswer } from './formatters'
import { validators } from './validators'
import { handleError } from './errors'
import { promptUser } from './prompt'

async function getInput(
  question: string,
  validator?: Validator,
  timeout: number = TIMEOUT_MS,
  format: Format = 'none',
  defaultValue?: string | number | boolean
): Promise<string | number | boolean> {
  const rl = createReadline()

  const displayInvalidEntryMessage = () => {
    console.clear()
    console.log(red('❌ Invalid entry. Please try again.'))
  }

  const handleDefaultValue = async (): Promise<string | number | boolean> => {
    rl.close()
    return formatAnswer(defaultValue, format)
  }

  const getInputFromUser = async (): Promise<string> => {
    console.log(brightCyan(question))
    return promptUser(
      rl,
      timeout,
      typeof defaultValue === 'string' ? defaultValue : undefined
    )
  }

  while (true) {
    try {
      const input = await getInputFromUser()
      const trimmedInput = input.trim()

      if (!trimmedInput) {
        if (defaultValue !== undefined) {
          return await handleDefaultValue()
        }

        displayInvalidEntryMessage()
        await sleep(1000)
        continue
      }

      const validatedInput = validator ? validator(trimmedInput) : trimmedInput

      if (validatedInput !== null) {
        rl.close()
        return formatAnswer(validatedInput, format)
      }

      if (defaultValue !== undefined && typeof defaultValue !== 'string') {
        return await handleDefaultValue()
      }

      displayInvalidEntryMessage()
      await sleep(1000)
    } catch (error) {
      if (defaultValue !== undefined) {
        return await handleDefaultValue()
      }
      handleError(error)
    }
  }
}

export async function input(
  question: string,
  options: InputConfig = {}
): Promise<string | number | boolean> {
  const {
    type,
    timeout = TIMEOUT_MS,
    format = 'none',
    default: defaultValue
  } = options
  const formattedQuestion = type === 'boolean' ? `${question} (y/n):` : question
  const validator = type ? validators[type] : undefined

  return getInput(formattedQuestion, validator, timeout, format, defaultValue)
}
