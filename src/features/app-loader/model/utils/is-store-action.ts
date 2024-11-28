import { StoreAction } from '../type'

export const isStoreAction = (value: unknown): value is StoreAction =>
  typeof value === 'object' && value !== null && 'type' in value && typeof 'type' === 'string'
