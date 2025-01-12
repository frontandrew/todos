import { ordersSlice as slice } from './model'
import { ordersMiddleware } from './middleware'

export const ordersSlice = { ...slice, middleware: ordersMiddleware }
export * from './type'
export * from './utils'
