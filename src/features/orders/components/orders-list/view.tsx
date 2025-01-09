import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'

import { OrderItem } from 'entities/order'
import { Ingredient } from 'entities/ingredient'
import { ingredientsSlice } from 'features/burger-ingredients'

import { OrdersAffiliation, ordersSlice } from '../../model'
import style from './style.module.css'

export const OrdersList: FC<{ affiliation: OrdersAffiliation }> = ({ affiliation }) => {
  const dispatch = useAppDispatch()
  const { orders } = useAppSelector(ordersSlice.selectors.state)
  const ingrs = useAppSelector(ingredientsSlice.selectors.getState)
    .reduce((acc, ingr) => acc.set(ingr.id, ingr), new Map<string, Ingredient>())


  useEffect(() => {
    dispatch(ordersSlice.actions.startWatchOrders(affiliation))
    return () => {
      dispatch(ordersSlice.actions.stopWatchOrders())
    }
  }, [])

  return (
    <ul className={style.container}>
      {orders.length <= 0 ? null : [...orders]
        .reverse()
        .map(({ ingredients, ...rest }) => {
          const orderIngredients = ingredients
            .reduce((acc, ingrId) => {
              const ingr = ingrs.get(ingrId)
              if (!ingr) return acc
              return [...acc, ingr]
            }, [] as Array<Ingredient>)

          return <OrderItem {...rest} ingredients={orderIngredients} key={rest.id}/>
        })
      }
    </ul>
  )
}
