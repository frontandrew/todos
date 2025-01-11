import { FC, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useModal } from 'hooks'
import { Modal } from 'components'

import { Order, OrderItem } from 'entities/order'
import { Ingredient } from 'entities/ingredient'
import { ingredientsSlice } from 'features/burger-ingredients' //TODO: sin

import { OrdersAffiliation, ordersSlice } from '../../model'
import style from './style.module.css'
import { OrderDetails } from 'features/order-details'

export const OrdersList: FC<{ affiliation: OrdersAffiliation }> = ({ affiliation }) => {
  const dispatch = useAppDispatch()
  let { orders: sortedOrders } = useAppSelector(ordersSlice.selectors.state)
  const ingrs = useAppSelector(ingredientsSlice.selectors.getState)
    .reduce((acc, ingr) => acc.set(ingr.id, ingr), new Map<string, Ingredient>())

  if (affiliation === 'user' && sortedOrders.length > 0) {
    sortedOrders = [...sortedOrders].reverse()
  }

  const [openedOrder, setOpenedOrder] = useState<Order>()
  const { isModalOpen, openModal, closeModal } = useModal({
    closeHandler: () => setOpenedOrder(undefined),
  })

  const handelOrderClick = useCallback((order: Order) => {
    setOpenedOrder(order)
    openModal()
  }, [openModal])

  useEffect(() => {
    dispatch(ordersSlice.actions.startWatchOrders(affiliation))
    return () => {
      dispatch(ordersSlice.actions.stopWatchOrders())
      dispatch(ordersSlice.actions.resetOrders())
    }
  }, [])

  return (
    <>
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
              <li
                onClick={() => handelOrderClick({ ingredients, ...rest })}
                key={rest.id}
              >
                <OrderItem
                  ingredients={orderIngredients}
                  {...rest}
                />
              </li>
            )
          })
        }
      </ul>

      {openedOrder?.id &&
        <Modal isVisible={isModalOpen} close={closeModal} title={
          <p className={'text text_type_digits-default'}>{`#${openedOrder.number}`}</p>
        }>
          <OrderDetails {...openedOrder}/>
        </Modal>
      }
    </>
  )
}
