import { input as inputFunc } from './input'
import { menu as menuFunc } from './menu'
import { spinner as spinnerFunc } from './spinner'

const prompt = {
  menu: menuFunc,
  input: inputFunc,
  spinner: spinnerFunc
}

export default prompt
export { menuFunc as menu, inputFunc as input, spinnerFunc as spinner }
