export const validators = {
  number: (input: string): number | null => {
    const parsed = Number(input)
    return Number.isNaN(parsed) ? null : parsed
  },
  boolean: (input: string): boolean | null => {
    const trimmed = input.trim().toLowerCase()
    if (trimmed === 'y') return true
    if (trimmed === 'n') return false
    return null
  }
}
