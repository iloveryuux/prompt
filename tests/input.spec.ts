import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { input } from '../src'

vi.mock('../src', async () => {
  const actual = await vi.importActual('../src')
  return {
    ...actual,
    input: vi.fn()
  }
})

describe('input function', () => {
  beforeEach(() => {
    const mockInput = vi.mocked(input)
    mockInput.mockImplementation(async (_, options) => {
      if (options?.type === 'number') return 10

      return 'Ryo'
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns the mocked username when prompted', async () => {
    const name = await input('Enter your name:')
    expect(name).toBe('Ryo')
  })

  it('returns a number when { result: "number" } is passed', async () => {
    const number = await input('Enter your age:', { type: 'number' })
    expect(number).toBe(10)
  })
})
