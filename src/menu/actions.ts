import { KEY_CTRL_C, KEY_DOWN, KEY_ENTER, KEY_UP } from '../consts'
import { renderMenu } from './display'

import type { KeyActionMap, MenuIcons } from '../types'

export function createKeyActionMap(
  title: string,
  options: string[],
  onSelection: (index: number) => void,
  input: NodeJS.ReadableStream,
  icons?: MenuIcons
): KeyActionMap {
  let selectedIndex = 0

  const updateAndRenderMenu = (newIndex: number) => {
    selectedIndex = (newIndex + options.length) % options.length
    renderMenu(title, options, selectedIndex, icons)
  }

  const handleUp = () => updateAndRenderMenu(selectedIndex - 1)
  const handleDown = () => updateAndRenderMenu(selectedIndex + 1)

  const handleEnter = () => {
    cleanUp()
    onSelection(selectedIndex)
  }

  const handleCtrlC = () => {
    cleanUp()
    onSelection(-1)
  }

  const cleanUp = () => {
    input.pause()
    process.stdin.setRawMode(false)
  }

  return {
    [KEY_UP]: handleUp,
    [KEY_DOWN]: handleDown,
    [KEY_ENTER]: handleEnter,
    [KEY_CTRL_C]: handleCtrlC
  }
}
