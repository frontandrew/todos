import { FC, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks'

import { OrderItem } from 'entities/order'
import { Ingredient } from 'entities/ingredient'
import { ingredientsSlice } from 'features/burger-ingredients' //TODO: sin

import { OrdersAffiliation, ordersSlice } from '../../model'
import style from './style.module.css'

export const OrdersList: FC<{ affiliation: OrdersAffiliation }> = ({ affiliation }) => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  let { orders: sortedOrders } = useAppSelector(ordersSlice.selectors.state)
  const ingrs = useAppSelector(ingredientsSlice.selectors.getState)
    .reduce((acc, ingr) => acc.set(ingr.id, ingr), new Map<string, Ingredient>())

  if (affiliation === 'user' && sortedOrders.length > 0) {
    sortedOrders = [...sortedOrders].reverse()
  }

  useEffect(() => {
    dispatch(ordersSlice.actions.startWatchOrders(affiliation))
    return () => {
      dispatch(ordersSlice.actions.stopWatchOrders())
      dispatch(ordersSlice.actions.resetOrders())
    }
  }, [])

  return (
      <ul className={style.container}>
        {sortedOrders.length <= 0 ? null : sortedOrders
          .map(({ ingredients, ...rest }) => {
            const orderIngredients = ingredients
              .reduce((acc, ingrId) => {
                const ingr = ingrs.get(ingrId)
                if (!ingr) return acc
                return [...acc, ingr]
              }, [] as Array<Ingredient>)

            return (
              <li key={rest.id}>
                <Link
                  to={`${location.pathname}/${rest.number}`}
                  state={{ backgroundLocation: location }}
                  style={{ color: 'inherit' }}
                >
                  <OrderItem
                    ingredients={orderIngredients}
                    {...rest}
                  />
                </Link>
              </li>
            )
          })
        }
      </ul>
  )
}
