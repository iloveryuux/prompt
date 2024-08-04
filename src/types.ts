export type Action = () => void
export type KeyActionMap = Record<string, Action>

export interface Menu {
  index: number
  text: string
}
