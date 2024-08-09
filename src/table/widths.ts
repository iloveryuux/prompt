export const getWidths = (rows: string[][]): number[] =>
  rows[0].map((_, colIdx) => Math.max(...rows.map(row => row[colIdx].length)))
