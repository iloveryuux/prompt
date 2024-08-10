export const formatRow = (
  row: string[],
  widths: number[],
  color: (text: string) => string,
  left: string,
  right: string
): string =>
  `${left}${row.map((cell, idx) => ` ${color(cell.padEnd(widths[idx]))} `).join(right)}${right}`
