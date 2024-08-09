import type { SpinnerColor } from '../types'
import {
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white
} from '@ryuux/palette'

const colorFunctions: Record<string, (text: string) => string> = {
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white
}

export function getColorFunction(
  color: SpinnerColor
): (text: string) => string {
  return colorFunctions[color] || colorFunctions.white
}
