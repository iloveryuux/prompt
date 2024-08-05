import { brightCyan, red } from '@ryuux/palette'
import { sleep } from '../shared/utils'
import { createReadlineInterface } from './interface'
import { promptUser } from './prompt'
import { validators } from './validator'

async function getValidInput(
  question: string,
  validator?: (answer: string) => string | number | boolean | null
): Promise<string | number | boolean> {
  const rl = createReadlineInterface()

  while (true) {
    console.log(brightCyan(question))
    const answer = await promptUser(rl)
    const parsedAnswer = validator ? validator(answer) : answer

    if (parsedAnswer !== null) {
      rl.close()
      return parsedAnswer
    }
    console.clear()
    console.log(red('❌ Invalid entry. Please try again.'))
    await sleep(1000)
    console.clear()
  }
}

export async function input(
  question: string,
  options?: { type?: 'number' | 'boolean' }
): Promise<string | number | boolean> {
  const resultType = options?.type
  const formattedQuestion =
    resultType === 'boolean' ? `${question} (y/n):` : question
  const validator = resultType ? validators[resultType] : undefined

  return getValidInput(formattedQuestion, validator)
}
