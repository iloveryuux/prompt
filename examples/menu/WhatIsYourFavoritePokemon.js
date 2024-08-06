import { menu } from '@ryuux/prompt'

const question = 'Choose your favorite Pokémon'
const options = ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu']

const choice = await menu(question, options)

console.log(`You chose ${choice.text}!!`)

/* another way to do it

menu(question, options).then(choice => {
  console.log(`You chose ${choice.text}!!`)
})
*/
