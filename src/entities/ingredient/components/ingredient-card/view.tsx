import { FC, SyntheticEvent } from 'react'
import { useDrag } from 'react-dnd'

import { Counter, CurrencyIcon } from 'uikit'
import { useAppDispatch } from 'hooks'

import { currentIngredientSlice } from '../../model'
import { IngredientCardProps } from './type'
import style from './style.module.css'

export const IngredientCard: FC<IngredientCardProps> = ({ data, count = 0 }) => {
  const { image = '', id, name = 'unknown', price = 0, } = data

  const { setCurrentIngredient } = currentIngredientSlice.actions
  const dispatch = useAppDispatch()

  const handleCardClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    dispatch(setCurrentIngredient(data))
  }

  const [{ isDrag }, cardRef] = useDrag({
    type: 'ingredient',
    item: data,
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
      draggable
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
