import { brightCyan, red } from '@ryuux/palette'
import { createReadlineInterface } from './interface'
import { validators } from './validator'
import { sleep } from './utils'
import { promptUser } from './prompt'

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
  options?: { result?: 'number' | 'boolean' }
): Promise<string | number | boolean> {
  const resultType = options?.result
  const formattedQuestion =
    resultType === 'boolean' ? `${question} (y/n):` : question
  const validator = resultType ? validators[resultType] : undefined

  return getValidInput(formattedQuestion, validator)
}
