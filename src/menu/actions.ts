import type { ActionMap, IconSet } from '../types'

import { KEY_CTRL_C, KEY_DOWN, KEY_ENTER, KEY_UP } from '../shared/constants'
import { sleep } from '../shared/utils'
import { red } from '@ryuux/palette'

import { renderMenu } from './display'

export function createKeyActionMap(
  title: string,
  options: string[],
  onSelection: (index: number) => void,
  input: NodeJS.ReadableStream,
  icons?: IconSet
): ActionMap {
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

  const handleCtrlC = async () => {
    console.clear()
    console.log(red('❌ You just pressed Ctrl+C. Exiting...'))

    await sleep(1000)
    console.clear()

    process.exit(1)
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
