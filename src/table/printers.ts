import { getColorFunction } from '../shared/colors'
import type { TableConfig } from '../types'

import type { defaultBorders } from './borders'
import { formatRow } from './formatters'

export const printTable = (
  rows: string[][],
  widths: number[],
  horizLine: string,
  opts: TableConfig['opts'],
  borders: typeof defaultBorders
): void => {
  const headColor = getColorFunction(opts?.colors?.head || 'white')
  const dataColor = getColorFunction(opts?.colors?.data || 'white')

  console.log(horizLine)
  rows.forEach((row, idx) => {
    const colorFn = idx === 0 ? headColor : dataColor
    console.log(formatRow(row, widths, colorFn, borders.left, borders.right))
    console.log(horizLine)
  })
}
