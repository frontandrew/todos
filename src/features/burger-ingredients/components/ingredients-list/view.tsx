import { forwardRef, useEffect, useMemo } from 'react'

import {
  currentIngredientSlice,
  Ingredient,
  IngredientDetails,
} from 'entities/ingredient'
import { Modal } from 'components'
import { useAppDispatch, useAppSelector, useModal } from 'hooks'

import { IngredientsGroupNames } from '../../consts'
import { IngredientsGroup } from '../ingredients-group'

import style from './style.module.css'

export const IngredientsList = forwardRef<HTMLUListElement>((_props, ref) => {
  const ingredients = useAppSelector(state => state.ingredients)
  const { ingredient } = useAppSelector(state => state.currentIngrdient)

  const { resetCurrentIngredient } = currentIngredientSlice.actions
  const dispatch = useAppDispatch()

  const { isModalOpen, closeModal, openModal } = useModal({
    closeHandler: () => dispatch(resetCurrentIngredient()),
  })

  const ingredientsMap = useMemo<Record<string, Ingredient[]>>(() => Object
    .keys(IngredientsGroupNames)
    .reduce(
      (acc, key) => (
        { ...acc, [key]: ingredients.filter(({ type }) => type === key) }
      ), {}
    ), [ingredients])

  useEffect(() => {
    if (ingredient) openModal()
  }, [ingredient])

  return (
    <>
      <ul className={style.container} ref={ref}>
        {Object.entries(ingredientsMap).map(([key, value]) =>
          value.length > 0 &&
          <IngredientsGroup
            categoryName={IngredientsGroupNames[value[0].type]}
            categoryId={key}
            ingredients={value}
            key={key}
          />
        )}
      </ul>

      <Modal title='Детали ингредиента' close={closeModal} isVisible={isModalOpen}>
        <IngredientDetails {...ingredient!} />
      </Modal>
    </>
  )
})
