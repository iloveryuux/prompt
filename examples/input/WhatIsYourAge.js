import { input } from '@ryuux/prompt'

const question = 'What is your age?'
const age = await input(question, { type: 'number' })

console.log(`your age is ${age} years`)

/* another way to do it

input(question, { type: 'number' }).then(age => {
  console.log(`Your age is ${age} years`)
})
*/
