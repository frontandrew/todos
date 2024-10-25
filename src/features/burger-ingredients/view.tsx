import { FC, ReactNode, useState } from 'react'
import { Tab } from 'uikit'

import { Ingredient, IngredientType } from 'entities/ingredient'

import { IngredientsGroup } from './components'
import { IngredientsGroupNames } from './consts'
import style from './style.module.css'

import { data } from './ingrs-mock'

export const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState(IngredientType[0])
  const [ingredients, setIngredients] = useState<Record<string, Ingredient[]> | null>(null)

  useEffect(() => {
    const catagorizedList = {
      [IngredientType[0]]: data.filter(({ type }) => type === IngredientType[0]),
      [IngredientType[1]]: data.filter(({ type }) => type === IngredientType[1]),
      [IngredientType[2]]: data.filter(({ type }) => type === IngredientType[2]),
    }

    setIngredients(catagorizedList)
  }, [])

  const renderGroups = (data: typeof ingredients): ReactNode[] | null => {
    if (!data) return null
    return Object.entries(data).map(([key, value], index) => (
      <IngredientsGroup
        category={IngredientsGroupNames[IngredientType[index]]}
        ingredients={value}
        key={key}
      />
    ))
  }

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
      <ul className={style.content}>
        {renderGroups(ingredients)}
      </ul>
    </article>
  )
}
