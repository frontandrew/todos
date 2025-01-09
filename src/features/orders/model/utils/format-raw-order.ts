import { Order } from 'entities/order'
import { RawOrder } from 'features/orders'

export const formatRawOrder = (response: RawOrder): Order => {
  const { _id, ...rest } = response
  return { ...rest, id: _id }
}
