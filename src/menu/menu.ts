import type { KeyActionMap } from '../types'
import { createKeyActionMap } from './actions'
import { renderMenu } from './display'

export async function menu(options: string[]): Promise<number> {
  return new Promise<number>(resolve => {
    const selectedIndex = 0
    process.stdin.setRawMode(true)
    process.stdin.resume()

    const keyActions: KeyActionMap = createKeyActionMap(
      options,
      resolve,
      process.stdin
    )

    const handleInput = (input: Buffer) => {
      const action = keyActions[input.toString()]
      if (action) action()
    }

    const cleanup = () => {
      process.stdin.off('data', handleInput)
      process.stdin.setRawMode(false)
      process.stdin.resume()
    }

    setupCleanup(cleanup)
    renderMenu(options, selectedIndex)
    process.stdin.on('data', handleInput)
  })
}

function setupCleanup(cleanup: () => void) {
  process.on('exit', cleanup)
  process.on('SIGINT', () => {
    cleanup()
    process.exit()
  })
}
