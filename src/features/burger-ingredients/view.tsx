import { FC, useCallback, useMemo, useRef, useState } from 'react'
import { InView } from 'react-intersection-observer'

import { Tabs } from 'components'
import { useAppSelector } from 'hooks'

import { Ingredient, IngredientCard } from 'entities/ingredient'

import { IngredientsGroupNames } from './consts'
import style from './style.module.css'

export const BurgerIngredients: FC = () => {
  const listRef = useRef<HTMLUListElement>(null)
  const [currentTab, setTab] = useState(Object.keys(IngredientsGroupNames)[0])

  const ingredients = useAppSelector(state => state.ingredients)
  const ingredientsMap = useMemo<Record<string, Ingredient[]>>(() => Object
    .keys(IngredientsGroupNames)
    .reduce(
      (acc, key) => (
        { ...acc, [key]: ingredients.filter(({ type }) => type === key) }
      ), {},
    ), [ingredients])

  const thresholds = useMemo(() => {
    const thresholdsData = Object
      .entries(ingredientsMap)
      .reduce((acc, [type, ingrs]) => {
        return ({ ...acc, total: acc.total + ingrs.length, [type]: ingrs.length })
      }, { total: 0 })
    const { total, ...rest } = thresholdsData

    return Object.entries(rest).reduce((acc, [type, length]) => {
      const empiricalCoefficient = 0.08
      return { ...acc, [type]: (Math.ceil((length as number) * 100 / total) / 100) - empiricalCoefficient }
    }, {})
  }, [ingredientsMap])

  const handleTabClick = useCallback((tabId: string) => {
    const targetEl = listRef.current?.querySelector(`#${tabId}`)
    if (targetEl instanceof Element) targetEl.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [listRef])

  return (
    <article className={style.container + ' pt-10 pb-10'}>
      <div className={style.header}>
        <h2 className={'text text_type_main-large'}>Собери бургер</h2>
        <Tabs
          onClick={handleTabClick}
          tabsNameValueMap={IngredientsGroupNames}
          currentTab={currentTab}
        />
      </div>
      <ul className={style.groups} ref={listRef}>
        {Object.entries(ingredientsMap).map(([key, ingrs]) =>
          ingrs.length > 0 &&
          <InView
            root={document.querySelector(style.groups)}
            onChange={(state) => {
              if (state) setTab(key)
            }}
            threshold={(thresholds as Record<string, number>)[key]}
            className={style.group}
            key={key}
            as={'li'}
            id={key}
          >
            <h3 className={'text text_type_main-medium'}>{IngredientsGroupNames[ingrs[0].type]}</h3>
            <ul className={style.items + ' pr-4 pl-4'}>
              {ingrs.map((ingr) =>
                <IngredientCard ingredient={ingr} key={ingr.id}/>,
              )}
            </ul>
          </InView>,
        )}
      </ul>
    </article>
  )
}
