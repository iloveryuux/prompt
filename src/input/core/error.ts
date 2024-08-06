import { red } from '@ryuux/palette'

export function handleError(error: Error): void {
  console.clear()
  console.error(red(`❌ ${error.message}`))
  if (error.message === 'Input timed out') {
    console.log(red('❌ Time out. Exiting.'))
    process.exit(1)
  }
}
