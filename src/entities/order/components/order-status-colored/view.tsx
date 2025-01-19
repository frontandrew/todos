import { FC } from 'react'
import { OrderStatus } from 'entities/order'
import { OrderStatusesMap } from '../../constants.ts'

export const OrderStatusColored: FC<{ text: OrderStatus, className?: string }> = ({ text, className }) => {

  const status = OrderStatusesMap[text]
  const ifStatIsDoneClass = text === 'done' ? ' text_color_success' : ''
  const classes = `text text_type_main-default ${ifStatIsDoneClass} ${className ?? ''}`


  return <span className={classes}>{status}</span>
}
