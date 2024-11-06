import { FC, SyntheticEvent, useCallback, useMemo } from 'react'

import { Button, CurrencyIcon } from 'uikit'
import { Modal } from 'components'
import { useModal } from 'hooks'

import { IngredientItem, IngredientType } from 'entities/ingredient'
import { Order, OrderDetails } from 'entities/order'

import style from './style.module.css'

/** TODO: возможно, декомпозировать на более мелкие и радтелить стэйт */
export const BurgerConstructor: FC<{ order: Order }> = ({ order }) => {
  const { isModalOpen, closeModal, openModal } = useModal()

  const [bun, otherIngredients] = useMemo(() => [
    order.ingredients.find(({ type }) => type === IngredientType[0]),
    order.ingredients.filter(({ type }) => type !== IngredientType[0]),
  ], [order.ingredients])

  const handleOrderSubmit = useCallback((e: SyntheticEvent) => {
    e.stopPropagation()
    openModal()
  }, [openModal])

  return (
    <>
      {order.ingredients.length > 0 &&
        <article className={style.container + ' pt-25 pb-10'}>

          <div className={style.content}>
            {bun && <IngredientItem ingredient={bun} isLocked={true} type='top' />}
            <ul className={style.draggable}>
              {otherIngredients.map(item => <IngredientItem ingredient={item} key={item.id} />)}
            </ul>
            {bun && <IngredientItem ingredient={bun} isLocked={true} type='bottom' />}
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
        </article>
      }

      <Modal close={closeModal} isVisible={isModalOpen}>
        <OrderDetails {...order} />
      </Modal>
    </>
  )
}
