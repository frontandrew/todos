import { FC, SyntheticEvent, useCallback, useMemo } from 'react'

import { Button, CurrencyIcon } from 'uikit'
import { Modal } from 'components'
import { useAppSelector, useModal } from 'hooks'

import { IngredientItem, IngredientType } from 'entities/ingredient'
import { OrderDetails } from 'entities/order'

import { EmptyItem, EmptyConstructor } from './componets'
import style from './style.module.css'

/** TODO: возможно, декомпозировать на более мелкие и радтелить стэйт */
export const BurgerConstructor: FC = () => {
  const order = useAppSelector(state => state.currentOrder)

  const [bun, otherIngredients] = useMemo(() => [
    order.ingredients.find(({ type }) => type === IngredientType.BUN),
    order.ingredients.filter(({ type }) => type !== IngredientType.BUN),
  ], [order.ingredients])

  const { isModalOpen, closeModal, openModal } = useModal()

  const handleOrderSubmit = useCallback((e: SyntheticEvent) => {
    e.stopPropagation()
    openModal()
  }, [openModal])

  return (
    <>
      <article className={style.container + ' pt-25 pb-10'}>
        {order.id ?
          <>
            <div className={style.content}>
              {bun?.orderIngredientIndex
                ? <IngredientItem ingredient={bun} isLocked={true} type='top' />
                : <EmptyItem expectType={IngredientType.BUN} />
              }
              {otherIngredients.length > 0
                ? <ul className={style.draggable}>
                  {otherIngredients.map(item => (
                    <EmptyItem expectType={'other'}>
                      <IngredientItem ingredient={item} key={item.id} />
                    </EmptyItem>
                  ))}
                </ul>
                : <EmptyItem expectType={'other'} />
              }
              {bun?.orderIngredientIndex
                ? <IngredientItem ingredient={bun} isLocked={true} type='bottom' />
                : <EmptyItem expectType={IngredientType.BUN} />
              }
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
        <OrderDetails {...order} />
      </Modal>
    </>
  )
}
