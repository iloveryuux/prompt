import { brightCyan, red } from '@ryuux/palette'
import { TIMEOUT_MS } from '../shared/constants'
import { sleep } from '../shared/utils'
import { createReadlineInterface } from './interface'
import { promptUser } from './prompt'
import { validators } from './validator'

async function getValidInput(
  question: string,
  validator?: (answer: string) => string | number | boolean | null,
  timeout: number = TIMEOUT_MS
): Promise<string | number | boolean> {
  while (true) {
    const rl = createReadlineInterface()
    console.log(brightCyan(question))

    try {
      const answer = await promptUser(rl, timeout)
      const parsedAnswer = validator ? validator(answer) : answer

      if (parsedAnswer !== null) {
        return parsedAnswer
      }

      console.clear()
      console.log(red('❌ Invalid entry. Please try again.'))
      await sleep(1000)
      console.clear()
    } catch (error) {
      handleInputError(error)
    }
  }
}

function handleInputError(error: Error): void {
  if (error.message === 'Input timed out') {
    console.clear()
    console.log(red('❌ Time out. Exiting.'))
    process.exit(1)
  } else {
    throw error
  }
}

export async function input(
  question: string,
  options?: { type?: 'number' | 'boolean'; timeout?: number }
): Promise<string | number | boolean> {
  const { type, timeout = TIMEOUT_MS } = options || {}
  const formattedQuestion = type === 'boolean' ? `${question} (y/n):` : question
  const validator = type ? validators[type] : undefined

  return getValidInput(formattedQuestion, validator, timeout)
}
