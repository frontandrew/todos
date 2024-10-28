import { FC, ReactNode, SyntheticEvent, useCallback, useMemo, useState } from 'react'
import { useModal } from 'components'
import { Tab } from 'uikit'

import { Ingredient, IngredientType, IngredientDetails } from 'entities/ingredient'

import { IngredientsGroup } from './components'
import { IngredientsGroupNames } from './consts'
import style from './style.module.css'

export const BurgerIngredients: FC<{ ingredients: Ingredient[] }> = ({ ingredients = [] }) => {
  const [currentTab, setCurrentTab] = useState('')
  const { Modal, open } = useModal()

  /** TODO: придумать как мапать ингредиенты не зная количества категорий */
  const ingredientsMap = useMemo<Record<string, Ingredient[]>>(() => ({
    [IngredientType[0]]: ingredients.filter(({ type }) => type === IngredientType[0]),
    [IngredientType[1]]: ingredients.filter(({ type }) => type === IngredientType[1]),
    [IngredientType[2]]: ingredients.filter(({ type }) => type === IngredientType[2]),
  }), [ingredients])

  const renderGroups = (data: typeof ingredientsMap): ReactNode[] => Object
    .entries(data)
    .map(([key, value], index) => (
      (key === currentTab || !currentTab) &&
      <IngredientsGroup
        category={IngredientsGroupNames[IngredientType[index]]}
        ingredients={value}
        key={key}
      />
    ))

  const hadleIngredientClick = useCallback((event: SyntheticEvent) => {
    event.stopPropagation()
    open()
  }, [open])

  return (
    <article className={style.container + ' pt-10'}>
      <div className={style.header}>
        <h2 className={'text text_type_main-large'}>Собери бургер</h2>
        <div className={style.tabs}>
          <Tab
            value={IngredientType[0]}
            active={currentTab === IngredientType[0]}
            onClick={setCurrentTab}
          >
            {IngredientsGroupNames[IngredientType[0]]}
          </Tab>
          <Tab
            value={IngredientType[1]}
            active={currentTab === IngredientType[1]}
            onClick={setCurrentTab}
          >
            {IngredientsGroupNames[IngredientType[1]]}
          </Tab>
          <Tab
            value={IngredientType[2]}
            active={currentTab === IngredientType[2]}
            onClick={setCurrentTab}
          >
            {IngredientsGroupNames[IngredientType[2]]}
          </Tab>
        </div>
      </div>
      <ul className={style.content} onClick={hadleIngredientClick}>
        {renderGroups(ingredientsMap)}
      </ul>
      <Modal title='Детали ингредиента'>
        <IngredientDetails {...ingredients[1]} />
      </Modal>
    </article>
  )
}
