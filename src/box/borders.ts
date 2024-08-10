import { repeatString } from './utils'

export const createTopBorder = (width: number): string =>
  `┌${repeatString('─', width)}┐`

export const createBottomBorder = (width: number): string =>
  `└${repeatString('─', width)}┘`
