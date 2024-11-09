import { FC, SyntheticEvent, useMemo } from 'react'
import { useDrag } from 'react-dnd'

import { Counter, CurrencyIcon } from 'uikit'
import { useAppDispatch } from 'hooks'
import { Ingredient, IngredientType } from 'entities/ingredient/type'

import { currentIngredientSlice } from '../../model'
import { IngredientViewType } from '../type'
import style from './style.module.css'

export const IngredientCard: FC<Ingredient> = (ingredient) => {
  const { image = '', id, name = 'unknown', price = 0, type, count = 0 } = ingredient

  const { setCurrentIngredient } = currentIngredientSlice.actions
  const dispatch = useAppDispatch()

  const handleCardClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    dispatch(setCurrentIngredient(ingredient))
  }

  /**
   * TODO: вынести вычисление принимаемых типов в отдельную
   * `entity/ingredient/components/utils`
   */
  const getDNDAcceptType = useMemo(() => (
    type === IngredientType.BUN ? IngredientType.BUN : 'other'
  ), [type])

  const [{ isDrag }, cardRef] = useDrag({
    type: `${IngredientViewType.CARD}-${getDNDAcceptType}`,
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  })


  const ingredientCard = (
    <li
      key={id}
      ref={cardRef}
      className={isDrag ? style.container_dragging : style.container}
      onClick={handleCardClick}
    >
      <img className={style.image} src={image} alt={name} />
      <div className={style.price}>
        <span className={'text text_type_digits-default'}>{price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <span className={'text text_type_main-default ' + style.name}>{name}</span>
      {count > 0 &&
        <Counter
          count={count}
          size="default"
          extraClass={style.counter}
        />
      }
    </li>
  )

  return id && name && (typeof price === 'number') ? ingredientCard : null
}
