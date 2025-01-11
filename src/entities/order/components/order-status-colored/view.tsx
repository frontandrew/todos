import { FC } from 'react'
import { OrderStatus } from 'entities/order'
import { OrderStatusesMap } from '../../constants.ts'

export const OrderStatusColored: FC<{ text: OrderStatus, classNames?: string }> = ({ text, classNames }) => {

  const status = OrderStatusesMap[text]
  const ifStatIsDoneClass = text === 'done' ? ' text_color_success' : ''
  const classes = `text text_type_main-default ${ifStatIsDoneClass} ${classNames ?? ''}`


  return <span className={classes}>{status}</span>
}
