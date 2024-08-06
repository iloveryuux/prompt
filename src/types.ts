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

export type Validator = (input: string) => string | number | boolean | null

export type Format = 'uppercase' | 'lowercase' | 'capitalize' | 'none'

export type InputConfig = {
  type?: 'number' | 'boolean'
  timeout?: number
  format?: Format
  default?: string | number | boolean
}
