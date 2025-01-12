import { RawOrder } from 'features/orders'

export const isRawOrder = (value: unknown): value is RawOrder =>
  typeof value === 'object'
  && value !== null
  && '_id' in value
  && typeof value._id === 'string'
  && 'name' in value
  && typeof value.name === 'string'
  && 'status' in value
  && typeof value.status === 'string'
  && 'createdAt' in value
  && typeof value.createdAt === 'string'
  && 'updatedAt' in value
  && typeof value.updatedAt === 'string'
  && 'number' in value
  && typeof value.number === 'number'
  && 'ingredients' in value
  && Array.isArray(value.ingredients)

