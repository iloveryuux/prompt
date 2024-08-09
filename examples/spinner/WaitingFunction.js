import { spinner } from '@ryuux/prompt'

async function Task() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('finish')
      resolve()
    }, 5000)
  })
}
;(async () => {
  await spinner(Task, {
    framePosition: 'right'
  })
})()
