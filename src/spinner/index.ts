import type { SpinnerConfig } from '../types'
import { createSpinner } from './spinner'

export async function spinner<T>(
  asyncFunction: () => Promise<T>,
  options?: SpinnerConfig
): Promise<T> {
  const spinner = createSpinner(options)
  const stopSpinner = spinner.start()

  try {
    return await asyncFunction()
  } finally {
    stopSpinner(false)
  }
}
