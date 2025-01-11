import { FC, memo } from 'react'
import { FormattedDate } from 'uikit'
import { PriceWithCurrency } from 'components'
import { useAppSelector } from 'hooks'

import { Order, OrderStatusColored } from 'entities/order'
import { ingredientsSlice } from 'features/burger-ingredients' //TODO: sin

import style from './style.module.css'

export const OrderDetails: FC<Order> = memo(({
  ingredients: ingrIds,
  createdAt,
  updatedAt,
  name,
  status,
}) => {
  const ingredients = useAppSelector(ingredientsSlice.selectors.getState)
    .filter(({ id }) => ingrIds.includes(id))
  const total = ingredients.reduce((acc, { price }) => acc + price, 0)
  const date = new Date(updatedAt ?? createdAt)

  return (
    <article className={style.container}>
      <h3 className={'text text_type_main-medium pt-10 pb-3'}>{name}</h3>
      <OrderStatusColored className={'pb-15'} text={status}/>
      <p className={'text text_type_main-medium pb-6'}>Состав:</p>
      <ul className={style.list}>
        {/*  <IngredientsList {...ingredients}/>*/}
      </ul>
      <footer className={style.footer + ' pt-10'}>
        <FormattedDate
          className={'text text_type_main-default text_color_inactive'}
          date={date}
        />
        <PriceWithCurrency value={total}/>
      </footer>
    </article>

  )
}, ({ id: old }, { id: nxt }) => old === nxt)
