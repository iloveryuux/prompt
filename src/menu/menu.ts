import { handleInput, restoreStdinMode, setStdinRawMode } from './stdin'
import { createKeyActionMap } from './actions'
import { setupCleanup } from './cleanup'
import { renderMenu } from './display'
import type { KeyActionMap, Menu, MenuIcons } from '../types'

export async function menu(
  title: string,
  options: string[],
  icons?: Partial<MenuIcons>
): Promise<Menu> {
  return new Promise<Menu>(resolve => {
    let selectedIndex = 0

    setStdinRawMode()

    const handleSelection = (index: number) => {
      const result: Menu = {
        index,
        text: index >= 0 ? options[index] : 'Cancelled'
      }
      cleanup()
      resolve(result)
    }

    const cleanup = () => {
      process.stdin.off('data', inputHandler)
      restoreStdinMode()
    }

    const keyActions: KeyActionMap = createKeyActionMap(
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
