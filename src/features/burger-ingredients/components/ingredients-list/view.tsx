import { forwardRef, useMemo } from 'react'

import { Ingredient, IngredientCard, IngredientDetails } from 'entities/ingredient'
import { Modal } from 'components'
import { useAppSelector, useModal } from 'hooks'

import { IngredientsGroupNames } from '../../consts'
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
      <ul className={style.groups} ref={ref}>
        {Object.entries(ingredientsMap).map(([key, ingrs]) =>
          ingrs.length > 0 &&
          <li className={style.group} id={key} key={key}>
            <h3 className={'text text_type_main-medium'}>{IngredientsGroupNames[ingrs[0].type]}</h3>
            <ul className={style.items + ' pr-4 pl-4'}>
              {ingrs.map((ingr) =>
                <IngredientCard ingredient={ingr} onCardClick={() => openModal()} key={ingr.id}/>
              )}
            </ul>
          </li>
        )}
      </ul>

      <Modal title='Детали ингредиента' close={closeModal} isVisible={isModalOpen}>
        <IngredientDetails/>
      </Modal>
    </>
  )
})
