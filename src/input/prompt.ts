import { blue } from '@ryuux/palette'
import { DEFAULT_SELECTION_ICON } from '../shared/constants'

import type readline from 'node:readline'

export function promptUser(
  rl: readline.Interface,
  timeout: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      rl.close()
      reject(new Error('Input timed out'))
    }, timeout)

    rl.question(blue(`${DEFAULT_SELECTION_ICON} `), answer => {
      clearTimeout(timer)
      rl.close()
      resolve(answer.trim())
    })
  })
}
