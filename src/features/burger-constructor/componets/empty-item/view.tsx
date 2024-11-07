import { FC } from 'react'
import { useDrop } from 'react-dnd'

import { useAppDispatch } from 'hooks'
import { currentOrderSlice } from 'entities/order'
import { Ingredient, IngredientType } from 'entities/ingredient'

import style from './style.module.css'
import { EmptyItemProps } from './type'

export const EmptyItem: FC<EmptyItemProps> = ({ children, expectType }) => {
  const { addOrderIngredient } = currentOrderSlice.actions
  const dispatch = useAppDispatch()

  const [{ isOver }, dropAreaRef] = useDrop<Ingredient, void, { isOver: boolean, canDrop: boolean, item: Ingredient }>({
    accept: 'ingredient',
    drop: (ingredient) => {
      dispatch(addOrderIngredient(ingredient))
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
      item: monitor.getItem(),
    })
  })

  const shouldExpand = !children || isOver

  return (
    <li className={style.container} ref={dropAreaRef}>
      <div className={shouldExpand ? style.droparea_expanded : style.droparea}>
        <p className='text text_type_main-default text_color_inactive'>
          {`Добавьте ${expectType === IngredientType.BUN ? 'булку' : 'ингредиент'}`}
        </p>
      </div>
      {children}
    </li>
  )
}
