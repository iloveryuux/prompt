import { red } from '@ryuux/palette'

export function handleError(error: Error): void {
  if (error.message === 'Input timed out') {
    console.clear()
    console.log(red('❌ Time out. Exiting.'))
    process.exit(1)
  } else {
    throw error
  }
}
