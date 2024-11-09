import { CheckOrderIsReady } from './type'

export const checkOrderIsReady: CheckOrderIsReady = (items, length) => {
  return Array.isArray(items) && items.length >= length
}
