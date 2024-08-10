export interface MenuItem {
  index: number
  text: string
}

export interface ActionMap {
  [key: string]: () => void
}

export interface IconSet {
  title?: string
  selected?: string
}

export type Format = 'uppercase' | 'lowercase' | 'capitalize' | 'none'

export interface InputConfig<T = string> {
  type?: 'number' | 'boolean'
  timeout?: number
  format?: Format
  default?: T
}

export type Colors =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'

export interface SpinnerConfig {
  color?: Colors
  title?: string
  framePosition?: 'left' | 'right'
}

export interface TableConfig {
  head?: string[]
  body?: string[][]
  database?: string
  tableName?: string
  opts?: {
    colors?: {
      head?: Colors
      data?: Colors
    }
    border?: {
      horiz?: string
      left?: string
      right?: string
      middle?: string
    }
  }
}

export type RowData = { [key: string]: string | number | null }

export interface BoxConfig {
  top?: number
  bottom?: number
  left?: number
  right?: number
}
