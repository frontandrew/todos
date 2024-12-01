import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

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



  // When I wrote this code, only God and I understood what was going on here.

  const sectionRefs = useRef<Record<string, HTMLLIElement>>({})

  useEffect(() => {
    const listElement = listRef.current

    const handleScroll = () => {
      if (listElement) {
        const sectionsInView: string[] = Object
          .keys(IngredientsGroupNames)
          .reduce((acc: Array<string>, section) => {

            const groupRect = sectionRefs.current[section].getBoundingClientRect()
            const listHeight = listElement.getBoundingClientRect().top ?? 0

            if (groupRect.top >= listHeight) return [...acc, section]
            return acc
          }, [])

        if (sectionsInView.length > 0) setTab(sectionsInView[0])
      }
    }
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll)
      return () => listElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Now only he can figure it out.



  const handleTabClick = useCallback((tabId: string) => {
    const targetEl = listRef.current?.querySelector(`#${tabId}`)
    if (targetEl instanceof Element) {
      setTab(tabId)
      targetEl.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }, [listRef])

  return (
    <article className={style.container + ' pt-10'}>
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
          <li className={style.group} id={key} key={key} ref={(el) => {
            sectionRefs.current[key] = el!
          }}>
            <h3 className={'text text_type_main-medium'}>{IngredientsGroupNames[ingrs[0].type]}</h3>
            <ul className={style.items + ' pr-4 pl-4'}>
              {ingrs.map((ingr) =>
                <IngredientCard ingredient={ingr} key={ingr.id}/>,
              )}
            </ul>
          </li>,
        )}
      </ul>
    </article>
  )
}
