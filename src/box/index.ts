import type { BoxConfig } from '../types'

import { createTopBorder, createBottomBorder } from './borders'
import { padLines, generatePaddingLines } from './utils'

export function box(text: string, options: BoxConfig = {}): void {
  const { left = 1, right = 1, top = 1, bottom = 1 } = options

  const textLines = text.split('\n')
  const textWidth =
    Math.max(...textLines.map(line => line.length)) + left + right

  const paddedTextLines = padLines(textLines, left, right)
  const topBorder = createTopBorder(textWidth)
  const bottomBorder = createBottomBorder(textWidth)

  const topPaddingLines = generatePaddingLines(textWidth, top)
  const bottomPaddingLines = generatePaddingLines(textWidth, bottom)

  const boxLines = [
    topBorder,
    ...topPaddingLines,
    ...paddedTextLines.map(line => `│${line}│`),
    ...bottomPaddingLines,
    bottomBorder
  ].join('\n')

  console.log(boxLines)
}
