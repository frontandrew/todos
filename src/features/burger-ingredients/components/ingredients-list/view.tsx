import { forwardRef, useMemo } from 'react'

import { Ingredient, IngredientDetails } from 'entities/ingredient'
import { Modal } from 'components'
import { useAppSelector, useModal } from 'hooks'

import { IngredientsGroupNames } from '../../consts'
import { IngredientsGroup } from '../ingredients-group'

import style from './style.module.css'

export const IngredientsList = forwardRef<HTMLUListElement>((_props, ref) => {
  const ingredients = useAppSelector(state => state.ingredients)
  const { isModalOpen, closeModal, openModal } = useModal()

  const ingredientsMap = useMemo<Record<string, Ingredient[]>>(() => Object
    .keys(IngredientsGroupNames)
    .reduce(
      (acc, key) => (
        { ...acc, [key]: ingredients.filter(({ type }) => type === key) }
      ), {}
  ), [ingredients])

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
        <IngredientDetails/>
      </Modal>
    </>
  )
})
