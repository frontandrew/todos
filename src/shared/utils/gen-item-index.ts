import { customAlphabet } from 'nanoid'
import { ID_ALPHABET, ID_LENGTH } from 'consts'

export const genItemIndex = (length: number = ID_LENGTH): string => {
  return customAlphabet(ID_ALPHABET, length)()
}
