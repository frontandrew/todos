import { FC } from 'react'
import { useDrop } from 'react-dnd'

import { useAppDispatch } from 'hooks'
import { currentOrderSlice, OrderIngredientItem } from 'entities/order'
import { Ingredient, IngredientType, IngredientViewType } from 'entities/ingredient'

import { EmptyItemProps } from './type'
import style from './style.module.css'

export const EmptyItem: FC<EmptyItemProps> = ({ children, expectType, targetIndex }) => {
  const { addOrderIngredient, sortOrderIngredients } = currentOrderSlice.actions
  const dispatch = useAppDispatch()

  const [{ isOver }, dropAreaRef] = useDrop<OrderIngredientItem | Ingredient, void, { isOver: boolean }>({
    accept: [IngredientViewType.CARD, IngredientViewType.ITEM],
    drop: (item, monitor) => {

      if (monitor.getItemType() === IngredientViewType.ITEM) {
        console.log(`CURR:`, monitor.getItem())
        const currId = (monitor.getItem() as OrderIngredientItem).orderIngredientIndex
        dispatch(sortOrderIngredients({ currId, targId: targetIndex! }))
        return
      }

      dispatch(addOrderIngredient({ item: (item as Ingredient), targId: targetIndex! }))
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    })
  })

  const isBunType = expectType === IngredientType.BUN
  const dropAreaStyles = !children
    ? style.droparea
    : isOver
      ? style.droparea_expanded
      : style.droparea_collapsed

  return (
    <li className={style.container} ref={dropAreaRef}>
      <div className={dropAreaStyles}>
        <p className='text text_type_main-default text_color_inactive'>
          {`Добавьте ${isBunType ? 'булку' : 'ингредиент'}`}
        </p>
      </div>
      {children}
    </li>
  )
}
