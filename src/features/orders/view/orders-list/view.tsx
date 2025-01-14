import { FC, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks'

import { OrderItem } from 'entities/order'

import { OrdersAffiliation, ordersSlice } from '../../model'
import style from './style.module.css'

export const OrdersList: FC<{ affiliation: OrdersAffiliation }> = ({ affiliation }) => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  let { orders: sortedOrders } = useAppSelector(ordersSlice.selectors.state)

  if (affiliation === 'user' && sortedOrders.length > 0) {
    sortedOrders = [...sortedOrders].reverse()
  }

  useEffect(() => {
    dispatch(ordersSlice.actions.startWatchOrders(affiliation))
    return () => {
      dispatch(ordersSlice.actions.stopWatchOrders())
    }
  }, [])

  return (
    <ul className={style.container}>
      {sortedOrders.length <= 0 ? null : sortedOrders
        .map((order) => (
            <li key={order.id}>
              <Link
                to={`${location.pathname}/${order.number}`}
                state={{ backgroundLocation: location }}
                style={{ color: 'inherit' }}
              >
                <OrderItem {...order}/>
              </Link>
            </li>
          )
        )
      }
    </ul>
  )
}
