import { FC, useCallback, useRef } from 'react'
import { Tabs } from 'components'

import { Ingredient, IngredientType } from 'entities/ingredient'

import { IngredientsList } from './components'
import { IngredientsGroupNames } from './consts'
import style from './style.module.css'

export const BurgerIngredients: FC<{ ingredients: Ingredient[] }> = ({ ingredients = [] }) => {
  const listRef = useRef<HTMLUListElement>(null)

  const handleTabClick = useCallback((tabId: string) => {
    const targetEl = listRef.current?.querySelector(`#${tabId}`)
    if (targetEl instanceof Element) targetEl.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [listRef])

  return (
    <article className={style.container + ' pt-10'}>
      <div className={style.header}>
        <h2 className={'text text_type_main-large'}>Собери бургер</h2>
        <Tabs
          onClick={handleTabClick}
          tabsNameValueMap={IngredientsGroupNames}
          initialTab={IngredientType[0]}
        />
      </div>
      <IngredientsList ingredients={ingredients} ref={listRef} />
    </article>
  )
}
