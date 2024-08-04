import { KEY_CTRL_C, KEY_DOWN, KEY_ENTER, KEY_UP } from '../consts'
import type { KeyActionMap } from '../types'
import { renderMenu } from './display'

export function createKeyActionMap(
  options: string[],
  resolve: (index: number) => void,
  input: NodeJS.ReadableStream
): KeyActionMap {
  let selectedIndex = 0

  const handleUp = () => {
    selectedIndex = Math.max(0, selectedIndex - 1)
    renderMenu(options, selectedIndex)
  }

  const handleDown = () => {
    selectedIndex = Math.min(options.length - 1, selectedIndex + 1)
    renderMenu(options, selectedIndex)
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
