import { brightCyan, red } from '@ryuux/palette'
import { TIMEOUT_MS } from '../shared/constants'
import { sleep } from '../shared/utils'
import type { Format, InputConfig, Validator } from '../types'
import { handleError } from './errors'
import { formatAnswer } from './formatters'
import { promptUser } from './prompt'
import { createReadlineInterface } from './readline'
import { validators } from './validators'

async function getInput(
  question: string,
  validator?: Validator,
  timeout: number = TIMEOUT_MS,
  format: Format = 'none',
  defaultValue?: string | number | boolean
): Promise<string | number | boolean> {
  const rl = createReadlineInterface()

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
        return formatAnswer(validatedInput, format)
      }

      if (defaultValue !== undefined && typeof defaultValue !== 'string') {
        return formatAnswer(defaultValue, format)
      }

      console.clear()
      console.log(red('❌ Invalid entry. Please try again.'))
      await sleep(1000)
      console.clear()
    } catch (error) {
      if (defaultValue !== undefined) {
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
