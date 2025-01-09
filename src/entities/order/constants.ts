import { OrderStatus } from 'entities/order/type.ts'

export const OrderStatusesMap: Record<OrderStatus, string> = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
}
