import { FC } from 'react'
import style from './style.module.css'

export const OrdersList: FC = () => {
  return (
    <article className={style.container}>
      <h2 className={'text text_type_main-medium'}>
        Здесь будет список ваших заказов...
      </h2>
    </article>
  )
}
