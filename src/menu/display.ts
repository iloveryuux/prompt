import { blue, bold } from '@ryuux/palette'
import { DEFAULT_TITLE_ICON, DEFAULT_ICON } from '../shared/constants'
import readline from 'node:readline'
import type { MenuIcons } from '../types'

const clearScreen = (): void => {
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
}

const getVisibleCount = (): number => {
  const { rows } = process.stdout
  return Math.max(rows - 2, 1)
}

const calculateVisibleRange = (
  totalOptions: number,
  currentIndex: number,
  visibleCount: number
): { start: number; end: number } => {
  let start = Math.max(0, currentIndex - Math.floor(visibleCount / 2))
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
    selected: selectedIcon = DEFAULT_ICON
  } = icons || {}

  clearScreen()
  console.log(`${blue(titleIcon)} ${bold(title)}`)

  const visibleCount = getVisibleCount()
  const { start, end } = calculateVisibleRange(options.length, selectedIndex, visibleCount)

  options.slice(start, end).forEach((option, index) => {
    const isSelected = start + index === selectedIndex
    console.log(formatOption(option, isSelected, selectedIcon))
  })
}
