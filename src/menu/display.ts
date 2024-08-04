import { blue, bold } from '@ryuux/palette'
import { VISIBLE_COUNT } from '../consts'

import readline from 'node:readline'

function clearScreen(): void {
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
}

function calculateVisibleRange(
  totalOptions: number,
  currentIndex: number
): { start: number; end: number } {
  const start = Math.max(0, currentIndex - Math.floor(VISIBLE_COUNT / 2))
  const end = Math.min(totalOptions, start + VISIBLE_COUNT)
  return { start, end }
}

function formatOption(option: string, isSelected: boolean): string {
  const indicator = isSelected ? blue('›') : ' '
  const formattedOption = isSelected ? blue(option) : option
  return `${indicator} ${formattedOption}`
}

export function renderMenu(
  title: string,
  options: string[],
  selectedIndex: number
): void {
  clearScreen()
  console.log(`${blue('ϟ')} ${bold(title)}`)

  const { start, end } = calculateVisibleRange(options.length, selectedIndex)

  options.slice(start, end).forEach((option, index) => {
    console.log(formatOption(option, start + index === selectedIndex))
  })
}
