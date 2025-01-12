import { FC } from 'react'
import { OrderDetails } from 'features/order-details'

import style from './style.module.css'

export const OrderPage: FC = () => (
  <div className={style.container}>
    <OrderDetails/>
  </div>
)
