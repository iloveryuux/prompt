import { spinner as spinnerFunc } from './spinner'
import { input as inputFunc } from './input'
import { table as tableFunc } from './table'
import { menu as menuFunc } from './menu'

const prompt = {
  menu: menuFunc,
  input: inputFunc,
  spinner: spinnerFunc,
  table: tableFunc
}

export default prompt
export {
  menuFunc as menu,
  inputFunc as input,
  spinnerFunc as spinner,
  tableFunc as table
}
