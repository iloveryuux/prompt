import { blue } from '@ryuux/palette'
import type readline from 'node:readline'

export function promptUser(rl: readline.Interface): Promise<string> {
  return new Promise(resolve => {
    rl.question(blue('> '), answer => {
      resolve(answer.trim())
    })
  })
}
