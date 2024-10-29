import { forwardRef, SyntheticEvent, useMemo } from 'react'

import { Ingredient, IngredientDetails, IngredientType } from 'entities/ingredient'
import { useModal } from 'components'

import { IngredientsGroupNames } from '../../consts'
import { IngredientsGroup } from '../ingredients-group'

import { IngredientsListProps } from './type'
import style from './style.module.css'

export const IngredientsList = forwardRef<HTMLUListElement, IngredientsListProps>(({ ingredients = [] }, ref) => {
  const { Modal, open } = useModal()

  const ingredientsMap = useMemo<Record<string, Ingredient[]>>(() => Object
    .entries(IngredientsGroupNames)
    .reduce(
      (acc, [key], index) => (
        { ...acc, [key]: ingredients.filter(({ type }) => type === IngredientType[index]) }
      ), {}
    ), [ingredients])

  const hadleIngredientClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    open()
  }

  return (
    <>
      <ul className={style.container} onClick={hadleIngredientClick} ref={ref}>
        {Object.entries(ingredientsMap).map(([key, value], index) =>
          <IngredientsGroup
            categoryName={IngredientsGroupNames[IngredientType[index]]}
            categoryId={key}
            ingredients={value}
            key={key}
          />
        )}
      </ul>

      <Modal title='Детали ингредиента'>
        <IngredientDetails {...ingredients[1]} />
      </Modal>
    </>
  )
})
