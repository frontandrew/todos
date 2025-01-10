import { OrderStatus } from 'entities/order'

export const OrderStatusesMap: Record<OrderStatus, string> = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
} as const
