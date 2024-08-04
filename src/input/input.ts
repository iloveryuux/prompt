import { blue, brightCyan, red } from '@ryuux/palette'
import { createReadlineInterface } from './interface'
import { validators } from './validator'
import { sleep } from './utils'

import type readline from 'node:readline'

function promptUser(rl: readline.Interface): Promise<string> {
  return new Promise(resolve => {
    rl.question(blue('> '), answer => {
      resolve(answer.trim())
    })
  })
}

async function getValidInput(
  question: string,
  resultType?: 'number' | 'boolean'
): Promise<string | number | boolean> {
  const rl = createReadlineInterface()
  const validator = resultType ? validators[resultType] : undefined

  while (true) {
    console.log(brightCyan(question))
    const answer = await promptUser(rl)

    const parsedAnswer = validator ? validator(answer) : answer
    const isValid = parsedAnswer !== null

    if (isValid) {
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

  return getValidInput(formattedQuestion, resultType)
}
