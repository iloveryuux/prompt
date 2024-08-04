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

export type ValidatorFunction = (
  answer: string
) => string | number | boolean | null
