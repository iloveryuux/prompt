import { sleep } from '../../shared/utils'
import { red } from '@ryuux/palette'

export async function InvalidEntryMessage(): Promise<void> {
  console.clear()
  console.log(red('❌ Invalid entry. Please try again.'))
  await sleep(1000)
}
