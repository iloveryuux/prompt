import { DEFAULT_TITLE_ICON, DEFAULT_ICON } from '../shared/constants'
import { getVisibleCount } from '../shared/utils'
import { blue, bold } from '@ryuux/palette'
import readline from 'node:readline'

import type { MenuIcons } from '../types'

const clearScreen = (): void => {
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
}

const calculateVisibleRange = (
  totalOptions: number,
  currentIndex: number,
  visibleCount: number
): { start: number; end: number } => {
  const halfVisibleCount = Math.floor(visibleCount / 2)
  let start = Math.max(0, currentIndex - halfVisibleCount)
  let end = Math.min(totalOptions, start + visibleCount)

  if (end - start < visibleCount) {
    start = Math.max(0, end - visibleCount)
  }

  return { start, end }
}

const formatOption = (
  option: string,
  isSelected: boolean,
  selectedIcon: string
): string =>
  `${isSelected ? selectedIcon : ' '} ${isSelected ? blue(option) : option}`

export const renderMenu = (
  title: string,
  options: string[],
  selectedIndex: number,
  icons: MenuIcons = { title: DEFAULT_TITLE_ICON, selected: DEFAULT_ICON }
): void => {
  const { title: titleIcon, selected: selectedIcon } = icons

  clearScreen()
  console.log(`${blue(titleIcon)} ${bold(title)}`)

  const visibleCount = getVisibleCount()
  const { start, end } = calculateVisibleRange(
    options.length,
    selectedIndex,
    visibleCount
  )

  options.slice(start, end).forEach((option, index) => {
    const isSelected = start + index === selectedIndex
    console.log(formatOption(option, isSelected, selectedIcon))
  })
}
