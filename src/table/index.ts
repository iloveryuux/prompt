import type { TableConfig } from '../types'

import { defaultBorders, createLine } from './borders'
import { formatRow } from './formatters'
import { getWidths } from './widths'

import { getColorFunction } from '../shared/colors'

export const table = ({ head = [], body, opts = {} }: TableConfig) => {
  const rows = head.length ? [head, ...body] : body
  const widths = getWidths(rows)

  const borders = { ...defaultBorders, ...opts.border }
  const headColor = getColorFunction(opts.colors?.head || 'white')
  const dataColor = getColorFunction(opts.colors?.data || 'white')

  const horizLine = createLine(widths, borders.horiz, borders.middle)
  console.log(horizLine)

  rows.forEach((row, idx) => {
    const colorFn = idx === 0 ? headColor : dataColor
    console.log(formatRow(row, widths, colorFn, borders.left, borders.right))
    console.log(horizLine)
  })
}
