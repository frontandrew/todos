import { ordersSlice as slice } from './model.ts'
import { ordersMiddleware } from './middleware.ts'

export const ordersSlice = { ...slice, middleware: ordersMiddleware }
export * from './type'
