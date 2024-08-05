import { KEY_CTRL_C, KEY_DOWN, KEY_ENTER, KEY_UP } from '../consts'
import { renderMenu } from './display'

import type { KeyActionMap, MenuIcons } from '../types'

export function createKeyActionMap(
  title: string,
  options: string[],
  resolve: (index: number) => void,
  input: NodeJS.ReadableStream,
  icons?: MenuIcons
): KeyActionMap {
  let selectedIndex = 0

  const handleUp = () => {
    selectedIndex = (selectedIndex - 1 + options.length) % options.length
    renderMenu(title, options, selectedIndex, icons)
  }

  const handleDown = () => {
    selectedIndex = (selectedIndex + 1) % options.length
    renderMenu(title, options, selectedIndex, icons)
  }

  const handleEnter = () => {
    input.pause()
    process.stdin.setRawMode(false)
    resolve(selectedIndex)
  }

  const handleCtrlC = () => {
    input.pause()
    process.stdin.setRawMode(false)
    resolve(-1)
  }

  return {
    [KEY_UP]: handleUp,
    [KEY_DOWN]: handleDown,
    [KEY_ENTER]: handleEnter,
    [KEY_CTRL_C]: handleCtrlC
  }
}
