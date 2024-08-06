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
