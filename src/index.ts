import { input as inputFunc } from './input/input'
import { menu as menuFunc } from './menu/menu'

const prompt = {
  menu: menuFunc,
  input: inputFunc
}

export default prompt
export { menuFunc as menu, inputFunc as input }
