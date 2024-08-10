import { spinner as spinnerFunc } from './spinner'
import { input as inputFunc } from './input'
import { table as tableFunc } from './table'
import { menu as menuFunc } from './menu'
import { box as boxFunc } from './box'

const prompt = {
  menu: menuFunc,
  input: inputFunc,
  spinner: spinnerFunc,
  table: tableFunc,
  box: boxFunc
}

export default prompt
export {
  menuFunc as menu,
  inputFunc as input,
  spinnerFunc as spinner,
  tableFunc as table,
  boxFunc as box
}
