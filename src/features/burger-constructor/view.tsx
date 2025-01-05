import { FC, SyntheticEvent, useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector, useModal } from 'hooks'
import { Button, CurrencyIcon } from 'uikit'
import { Modal } from 'components'
import { apiSlice } from 'api'

import { IngredientType } from 'entities/ingredient'
import { OrderDetails } from 'entities/order'
import { userSlice } from 'entities/user'

import { burgerConstructorSlice as model } from './model'
import { BurgerConstructorItem } from './componets'
import style from './style.module.css'

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const user = useAppSelector(userSlice.selectors.user)
  const { ingredients, isReady, orderNumber, total } = useAppSelector(model.selectors.state)
  const { resetConstructorState } = model.actions
  const [postOrder] = apiSlice.usePostOrderMutation()

  const [bun, otherIngredients] = useMemo(() => [
    ingredients.find(({ type }) => type === IngredientType.BUN),
    ingredients.filter(({ type }) => type !== IngredientType.BUN),
  ], [ingredients])


  const { isModalOpen, closeModal, openModal } = useModal({
    closeHandler: () => dispatch(resetConstructorState()),
  })

  const handleOrderSubmit = useCallback((e: SyntheticEvent) => {
    e.stopPropagation()
    if (!user) navigate('/login')
    else postOrder(ingredients)
  }, [navigate, ingredients, postOrder, user])

  useEffect(() => {
    if (orderNumber) openModal()
  }, [openModal, orderNumber])

  return (
    <>
      <article className={style.container + ' pt-25 pb-10'}>
        <div className={style.content}>
          <BurgerConstructorItem
            ingredient={bun}
            key={`${bun?.inBurgerConstructorIndex}1`}
            expectType={IngredientType.BUN}
            position={'top'}
          />

          <ul className={style.draggable}>
            {otherIngredients.length > 0
              ? otherIngredients.map(item => (
                <BurgerConstructorItem
                  ingredient={item}
                  key={item.inBurgerConstructorIndex}
                  expectType={'other'}
                />
              ))
              : <BurgerConstructorItem key={`3`} expectType={'other'}/>
            }
          </ul>

          <BurgerConstructorItem
            ingredient={bun}
            key={`${bun?.inBurgerConstructorIndex}2`}
            expectType={IngredientType.BUN}
            position={'bottom'}
          />
        </div>

        <div className={style.footer}>
          <div className={style.total}>
            <span className={'text text_type_digits-medium'}>{total}</span>
            <CurrencyIcon type={'primary'}/>
          </div>
          <Button
            type={'primary'}
            htmlType={'submit'}
            disabled={!isReady}
            onClick={handleOrderSubmit}
          >
            Оформить заказ
          </Button>
        </div>
      </article>

      <Modal close={closeModal} isVisible={isModalOpen}>
        <OrderDetails orderId={orderNumber!}/>
      </Modal>

    </>
  )
}
