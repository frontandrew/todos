import { CheckIsReady } from './type'

export const checkIsReady: CheckIsReady = (items, length) => {
  return Array.isArray(items) && items.length >= length
}
