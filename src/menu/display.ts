import { blue, bold } from '@ryuux/palette'
import {
  VISIBLE_COUNT,
  DEFAULT_TITLE_ICON,
  DEFAULT_SELECTED_ICON
} from '../consts'
import readline from 'node:readline'
import type { MenuIcons } from '../types'

const clearScreen = (): void => {
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
}

const calculateVisibleRange = (
  totalOptions: number,
  currentIndex: number
): { start: number; end: number } => {
  const start = Math.max(0, currentIndex - Math.floor(VISIBLE_COUNT / 2))
  const end = Math.min(totalOptions, start + VISIBLE_COUNT)
  return { start, end }
}

const formatOption = (
  option: string,
  isSelected: boolean,
  selectedIcon: string
): string => {
  const indicator = isSelected ? selectedIcon : ' '
  return `${indicator} ${isSelected ? blue(option) : option}`
}

export const renderMenu = (
  title: string,
  options: string[],
  selectedIndex: number,
  icons?: MenuIcons
): void => {
  const {
    title: titleIcon = DEFAULT_TITLE_ICON,
    selected: selectedIcon = DEFAULT_SELECTED_ICON
  } = icons || {}

  clearScreen()
  console.log(`${blue(titleIcon)} ${bold(title)}`)

  const { start, end } = calculateVisibleRange(options.length, selectedIndex)

  options.slice(start, end).forEach((option, index) => {
    const isSelected = start + index === selectedIndex
    console.log(formatOption(option, isSelected, selectedIcon))
  })
}
