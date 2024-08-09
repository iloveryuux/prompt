export function setStdinRawMode() {
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.setEncoding('utf-8')
}

export function restoreStdinMode() {
  process.stdin.setRawMode(false)
  process.stdin.pause()
}

export function handleInput(keyActions: Record<string, () => void>) {
  return (input: string) => {
    if (keyActions[input]) {
      keyActions[input]()
    }
  }
}
