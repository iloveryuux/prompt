export interface Menu {
  index: number
  text: string
}

export interface KeyActionMap {
  [key: string]: () => void
}

export interface MenuIcons {
  title?: string
  selected?: string
}

export type Validator = (input: string) => string | number | boolean | null

export type Format = 'uppercase' | 'lowercase' | 'capitalize' | 'none'

export type InputConfig = {
  type?: 'number' | 'boolean'
  timeout?: number
  format?: Format
  default?: string | number | boolean
}
