import { FC, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FormattedDate } from 'uikit'

import { apiSlice } from 'api'
import { useAppSelector } from 'hooks'
import { PriceWithCurrency } from 'components'

import { Order, OrderStatusColored } from 'entities/order'
import { isRawOrder } from 'features/orders'
import { ingredientsSlice } from 'features/burger-ingredients' //TODO: sin

import style from './style.module.css'

export const OrderDetails: FC<{ variant?: 'modal' | 'default' }> = ({ variant = 'default' }) => {
  const allIngredients = useAppSelector(ingredientsSlice.selectors.getState)
  const [getOrderById, { data }] = apiSlice.useLazyGerOrderByIdQuery()
  const [order, setOrder] = useState<Order>()
  const { pathname } = useLocation()


  useEffect(() => {
    const orderNumber = Number(pathname.split('/').reverse()[0])
    if (orderNumber) getOrderById(orderNumber)

    return () => {
      setOrder(undefined)
    }
  }, [])

  useEffect(() => {
    if (data && typeof data === 'object' && 'orders' in data && Array.isArray(data.orders) && data.orders.length > 0) {
      const rawOrder = data.orders[0]
      if (isRawOrder(rawOrder)) {
        setOrder({ ...rawOrder, id: rawOrder._id })
      }
    }

  }, [data])

  const renderData = useMemo(() => {
    if (order) {
      const { ingredients, createdAt, updatedAt, ...rest } = order
      const orderIngredients = allIngredients.filter(({ id }) => ingredients.includes(id))

      return {
        ...rest,
        ingredients: orderIngredients,
        total: orderIngredients.reduce((acc, { price }) => acc + price, 0),
        date: new Date(updatedAt ?? createdAt),
      }
    }

    return null
  }, [order])

  if (renderData) {
    const { number, name, total, date, status } = renderData
    const headerStyles = `text text_type_digits-default pb-5 ${
      variant === 'default' ? style.header : style.header_modal
    }`

    return (
      <article className={style.container}>
        <p className={headerStyles}>{`#${number}`}</p>
        <h3 className={'text text_type_main-medium pb-3'}>{name}</h3>
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
  }

  return null
}
