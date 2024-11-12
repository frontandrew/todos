import { FC, SyntheticEvent, useCallback, useEffect, useMemo } from 'react'

import { useAppSelector, useModal } from 'hooks'
import { Button, CurrencyIcon } from 'uikit'
import { Modal } from 'components'
import { apiSlice } from 'api'

import { IngredientType } from 'entities/ingredient'
import { OrderDetails } from 'entities/order'

import { EmptyItem, EmptyConstructor } from './componets'
import style from './style.module.css'

/** TODO: возможно, декомпозировать на более мелкие и радтелить стэйт */
export const BurgerConstructor: FC = () => {
  const order = useAppSelector(state => state.currentOrder)
  const [postOrder] = apiSlice.usePostOrderMutation()

  const [bun, otherIngredients] = useMemo(() => [
    order.ingredients.find(({ type }) => type === IngredientType.BUN),
    order.ingredients.filter(({ type }) => type !== IngredientType.BUN),
  ], [order.ingredients])

  const { isModalOpen, closeModal, openModal } = useModal()

  const handleOrderSubmit = useCallback((e: SyntheticEvent) => {
    e.stopPropagation()
    postOrder(order.ingredients)
  }, [order, postOrder])

  useEffect(() => {
    if (order.id) openModal()
  }, [openModal, order.id])

  return (
    <>
      <article className={style.container + ' pt-25 pb-10'}>
        {order.ingredients.length > 0 ?
          <>
            <div className={style.content}>
              <EmptyItem
                orderIngredient={bun}
                key={`${bun?.orderIngredientIndex}1`}
                expectType={IngredientType.BUN}
                position={'top'}
              />

              <ul className={style.draggable}>
                {otherIngredients.length > 0
                  ? otherIngredients.map(item => (
                    <EmptyItem
                      orderIngredient={item}
                      key={item.orderIngredientIndex}
                      expectType={'other'}
                    />
                  ))
                  : <EmptyItem key={`3`} expectType={'other'} />
                }
              </ul>

              <EmptyItem
                orderIngredient={bun}
                key={`${bun?.orderIngredientIndex}2`}
                expectType={IngredientType.BUN}
                position={'bottom'}
              />
            </div>

            <div className={style.footer}>
              <div className={style.total}>
                <span className='text text_type_digits-medium'>{order.total}</span>
                <CurrencyIcon type='primary' />
              </div>
              <Button
                type='primary'
                htmlType='submit'
                disabled={order.ingredients.length < 3}
                onClick={handleOrderSubmit}
              >
                Оформить заказ
              </Button>
            </div>
          </>
          :
          <EmptyConstructor />
        }
      </article>

      <Modal close={closeModal} isVisible={isModalOpen}>
        <OrderDetails orderId={order.id ?? undefined} />
      </Modal>
    </>
  )
}
