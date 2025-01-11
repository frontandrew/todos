import { FC } from 'react'

import { orderDoneIcon } from './assets'
import style from './style.module.css'

export const OrderNotification: FC<{ orderId: number }> = ({ orderId }) => (
  <article className={style.container + ' pb-20'}>
    <h3 className={style.title + ' text text_type_digits-large pb-8'}>
      {orderId}
    </h3>
    <h4 className={'text text_type_main-medium'}>идентификатор заказа</h4>
    <img className={'p-15'} src={orderDoneIcon} alt={'Ваш заказ начали готовить'} />
    <p className={'text text_type_main-small pb-2'}>Ваш заказ начали готовить</p>
    <span className={'text text_type_main-small text_color_inactive'}>
      Дождитесь готовности на орбитальной станции
    </span>
  </article>
)
