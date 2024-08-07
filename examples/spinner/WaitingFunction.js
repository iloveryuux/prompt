import { spinner } from './dist/index.js'

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
