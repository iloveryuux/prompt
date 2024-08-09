export const defaultBorders = {
  horiz: '─',
  left: '│',
  right: '│',
  middle: '┼'
}

export const createLine = (
  widths: number[],
  border: string,
  middle: string
): string =>
  `${middle}${widths.map(width => border.repeat(width + 2)).join(middle)}${middle}`
