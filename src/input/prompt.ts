import type readline from 'node:readline'

import { DEFAULT_SELECTION_ICON } from '../shared/constants'
import { blue } from '@ryuux/palette'

export function promptUser(
  rl: readline.Interface,
  timeout: number,
  defaultValue = ''
): Promise<string> {
  return new Promise((resolve, reject) => {
    const startTimeout = () =>
      setTimeout(() => {
        rl.close()
        reject(new Error('Input timed out'))
      }, timeout)

    const timer = startTimeout()

    rl.question(blue(`${DEFAULT_SELECTION_ICON} `), (answer: string) => {
      clearTimeout(timer)
      try {
        resolve(answer.trim() || defaultValue)
      } catch (error) {
        reject(new Error('Failed to close readline interface'))
      }
    })
  })
}
