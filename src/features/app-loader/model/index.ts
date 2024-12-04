import { appLoaderSlice as slice } from './model.ts'
import { appLoaderMiddleware } from './middleware.ts'

export const appLoaderSlice = { ...slice, middleware: appLoaderMiddleware }
