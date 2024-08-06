import { DEFAULT_SELECTION_ICON } from '../../shared/constants'
import { createTimeoutPromise } from '../core/timeout'

import type readline from 'node:readline'

export async function promptUser(
  rl: readline.Interface,
  timeout: number,
  defaultValue: string
): Promise<string> {
  const { promise, timer } = createTimeoutPromise(timeout)

  return new Promise((resolve, reject) => {
    rl.question(`${DEFAULT_SELECTION_ICON} `, (answer: string) => {
      clearTimeout(timer)
      resolve(answer.trim() || defaultValue)
    })

    promise.catch(() => {
      rl.close()
      reject(new Error('Input timed out'))
    })
  })
}
