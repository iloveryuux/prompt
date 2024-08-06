import type { ActionMap, IconSet, MenuItem } from '../types'

import { handleInput, restoreStdinMode, setStdinRawMode } from './stdin'
import { createKeyActionMap } from './actions'
import { setupCleanup } from './cleanup'
import { renderMenu } from './display'

export async function menu(
  title: string,
  options: string[],
  icons?: Partial<IconSet>
): Promise<MenuItem> {
  return new Promise<MenuItem>(resolve => {
    const selectedIndex = 0

    setStdinRawMode()

    const handleSelection = (index: number) => {
      const result: MenuItem = {
        index,
        text: options[index]
      }
      cleanup()
      resolve(result)
    }

    const cleanup = () => {
      process.stdin.off('data', inputHandler)
      restoreStdinMode()
    }

    const keyActions: ActionMap = createKeyActionMap(
      title,
      options,
      handleSelection,
      process.stdin,
      icons
    )
    const inputHandler = handleInput(keyActions)

    setupCleanup(cleanup)

    renderMenu(title, options, selectedIndex, icons)
    process.stdin.on('data', inputHandler)
  })
}
