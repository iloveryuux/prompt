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

  while (true) {
    console.log(brightCyan(question))

    try {
      const input = await promptUser(
        rl,
        timeout,
        typeof defaultValue === 'string' ? defaultValue : undefined
      )
      const validatedInput = validator ? validator(input) : input

      if (validatedInput !== null) {
        rl.close()
        return formatAnswer(validatedInput, format)
      }

      if (defaultValue !== undefined && typeof defaultValue !== 'string') {
        rl.close()
        return formatAnswer(defaultValue, format)
      }

      console.clear()
      console.log(red('❌ Invalid entry. Please try again.'))
      await sleep(1000)
      console.clear()
    } catch (error) {
      if (defaultValue !== undefined) {
        rl.close()
        return formatAnswer(defaultValue, format)
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
