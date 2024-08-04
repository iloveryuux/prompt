import { blue, brightCyan } from '@ryuux/palette'
import { createReadlineInterface } from './interface'

import type readline from 'node:readline'

function promptUser(rl: readline.Interface): Promise<string> {
  return new Promise(resolve => {
    rl.question(blue('> '), answer => {
      resolve(answer.trim())
    })
  })
}

export async function input(question: string): Promise<string> {
  const rl = createReadlineInterface()

  try {
    console.log(brightCyan(`🔍 ${question}`))
    return await promptUser(rl)
  } finally {
    rl.close()
  }
}
