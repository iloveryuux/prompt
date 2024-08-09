import type { SpinnerConfig } from '../types'

import { getColorFunction } from '../shared/colors'
import { red } from '@ryuux/palette'
import readline from 'node:readline'

export function createSpinner(options: SpinnerConfig = {}) {
  const frames = ['|', '/', '-', '\\']
  const interval = 100
  const { color = 'white', title = '', framePosition = 'left' } = options

  const colorFunction = getColorFunction(color)
  const interruptionMessage = red('❌ you pressed CTRL_C exiting')
  let currentFrameIndex = 0

  function getSpinnerText(frame: string): string {
    return framePosition === 'left'
      ? `${colorFunction(`${frame} ${title}`)}`
      : `${colorFunction(`${title} ${frame}`)}`
  }

  function updateSpinner() {
    readline.cursorTo(process.stdout, 0)
    const frame = frames[currentFrameIndex]
    process.stdout.write(getSpinnerText(frame))
    currentFrameIndex = (currentFrameIndex + 1) % frames.length
  }

  function startSpinner() {
    const spinnerInterval = setInterval(updateSpinner, interval)

    function stopSpinner(isInterrupted: boolean) {
      clearInterval(spinnerInterval)
      readline.cursorTo(process.stdout, 0)
      const message = isInterrupted
        ? interruptionMessage
        : `${colorFunction(title)}`
      process.stdout.write(`${message} \n`)
    }

    process.on('SIGINT', () => {
      stopSpinner(true)
      process.exit()
    })

    return stopSpinner
  }

  return {
    start: startSpinner
  }
}
