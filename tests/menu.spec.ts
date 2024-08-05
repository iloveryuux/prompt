import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest'
import { Readable, Writable } from 'node:stream'
import { menu } from '../src'

import readline from 'node:readline'

describe('menu', () => {
  let rl: readline.Interface
  let input: Readable
  let output: Writable

  beforeEach(() => {
    input = new Readable({
      read() {}
    })
    output = new Writable({
      write(chunk, encoding, callback) {
        callback()
      }
    })

    rl = readline.createInterface({
      input,
      output
    })

    vi.spyOn(readline, 'createInterface').mockReturnValue(rl)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const simulateKeypress = (key: string): Promise<void> => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        input.emit('keypress', '', { name: key })
        resolve()
      }, 50)
    })
  }

  const selectOption = async (optionIndex: number): Promise<void> => {
    for (let i = 0; i < optionIndex; i++) {
      await simulateKeypress('down')
    }
    await simulateKeypress('return')
  }

  const testOption = async (optionIndex: number): Promise<void> => {
    const title = 'Welcome to @ryuux/prompt:'
    const options = ['iloveryuux', 'ryuux', 'cli']

    await selectOption(optionIndex)

    const result = await menu(title, options)
    const expectedText = options[optionIndex]

    expect(result).toEqual({ index: optionIndex, text: expectedText })
  }

  it('should return the correct option selected with no down keypress', async () => {
    await testOption(0)
  }, 10000)

  it('should return the correct option selected with one down keypress', async () => {
    await testOption(1)
  }, 10000)

  it('should return the correct option selected with two down keypresses', async () => {
    await testOption(2)
  }, 10000)
})
