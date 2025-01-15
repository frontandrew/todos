import { FC, memo, useEffect, useRef, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { FormattedDate } from 'uikit'
import { useAppSelector } from 'hooks'
import { PriceWithCurrency } from 'components'

import { Order, OrderStatusColored } from 'entities/order'
import { Ingredient, IngredientIcon, IngredientType } from 'entities/ingredient'
import {  selectIngredientsByIds } from 'features/burger-ingredients'

import style from './style.module.css'

export const OrderItem: FC<Order> = memo(({
    name,
    number,
    status,
    createdAt,
    updatedAt,
    ingredients: ingrIds,
  }) => {
    const date = new Date(updatedAt ?? createdAt)
    const ingredients = useAppSelector((state) => selectIngredientsByIds(state, ingrIds), shallowEqual)
      .filter(Boolean) as Ingredient[]
    const total = ingredients.reduce((acc, { price, type }) => {
      return acc + (type === IngredientType.BUN ? 2 : 1) * price
    }, 0)

    /* TODO: separate to IngredientsPreviewList */
    const unicIgrs = Array.from(new Set(ingredients)).reverse()

    const listRef = useRef<HTMLUListElement>(null)
    const [ingrsVisible, setIngrsVisible] = useState(0)
    const [ingrsHidden, setIngrsHidden] = useState(0)

    useEffect(() => {
      if (listRef.current && unicIgrs.length > 0) {
        const magicFactor = 55
        const length = Math.floor(listRef.current.offsetWidth / magicFactor)
        const hidden = unicIgrs.length - length
        setIngrsVisible(length)
        setIngrsHidden(hidden)
      }
    }, [unicIgrs.length])

    return (
      <article className={style.container}>
        <div className={style.header}>
          <p className={'text text_type_digits-default'}>{`#${number}`}</p>
          <FormattedDate
            className={'text text_type_main-default text_color_inactive'}
            date={date}
          />
        </div>
        <div className={style.title}>
          <h3 className={'text text_type_main-medium'}>{name}</h3>
          <OrderStatusColored text={status}/>
        </div>
        <div className={style.details}>
          {/* TODO: separate to IngredientsPreviewList */}
          <ul className={style.components} ref={listRef}>

            {unicIgrs.length > ingrsVisible && unicIgrs
              .slice(ingrsVisible, ingrsVisible + 1)
              .map((ingredient, index) =>
                <li
                  className={style.component}
                  key={`${ingredient.id}-${index}`}
                >
                  <div className={style.count_back}></div>
                  <span className={style.count + ' text text_type_digits-default'}>
                  {`+${ingrsHidden}`}
                </span>
                  <IngredientIcon {...ingredient}/>
                </li>
              )}

            {unicIgrs.length > 0 && unicIgrs
              .slice(0, ingrsVisible)
              .reverse()
              .map((ingredient, index) =>
                <li
                  className={style.component}
                  key={`${ingredient.id}-${index}`}
                >
                  <IngredientIcon {...ingredient}/>
                </li>
              )}

          </ul>
          <PriceWithCurrency value={total}/>
        </div>
      </article>
    )
  }, (prevProps, nextProps) =>
    prevProps.status === nextProps.status,
)
