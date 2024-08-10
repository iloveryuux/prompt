export const repeatString = (char: string, count: number): string =>
  char.repeat(count)

export const padLines = (
  lines: string[],
  left: number,
  right: number
): string[] => lines.map(line => ' '.repeat(left) + line + ' '.repeat(right))

export const generatePaddingLines = (width: number, count: number): string[] =>
  Array(count).fill(`│${' '.repeat(width)}│`)
