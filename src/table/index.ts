import type { TableConfig } from '../types'

import { createLine, defaultBorders } from './borders'
import { printTable } from './printers'
import { getWidths } from './widths'
import { getRows } from './rows'

export const table = async ({
  head = [],
  body,
  opts = {},
  database,
  tableName
}: TableConfig) => {
  const rows = await getRows({ head, body, database, tableName })

  const widths = getWidths(rows)
  const borders = { ...defaultBorders, ...opts.border }
  const horizLine = createLine(widths, borders.horiz, borders.middle)

  printTable(rows, widths, horizLine, opts, borders)
}
