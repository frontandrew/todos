import { FC, useCallback, useMemo } from 'react'
import { useDrop } from 'react-dnd'

import { useAppDispatch } from 'hooks'
import { currentOrderSlice, OrderIngredientItem } from 'entities/order'
import { IngredientType, IngredientViewType } from 'entities/ingredient'

import { EmptyItemProps } from './type'
import style from './style.module.css'

export const EmptyItem: FC<EmptyItemProps> = ({ children, expectType, targetIndex }) => {
  const { sortOrderIngredients, addOrderIngredient } = currentOrderSlice.actions
  const dispatch = useAppDispatch()

  const handleDrop: (x: OrderIngredientItem) => void = useCallback((item) => {
    if (!item.orderIngredientIndex) dispatch(addOrderIngredient({ item, targId: targetIndex }))
    else dispatch(sortOrderIngredients({ currId: item.orderIngredientIndex, targId: targetIndex! }))
  }, [addOrderIngredient, dispatch, sortOrderIngredients, targetIndex])

  /**
   * TODO: вынести вычисление принимаемых типов в отдельную
   * `entity/ingredient/components/utils`
   */
  const dndAcceptTypesMap = useMemo(() => ({
    fromOrder: `${IngredientViewType.ITEM}-${expectType}`,
    fromList: `${IngredientViewType.CARD}-${expectType}`,
  }), [expectType])

  const [{ isOver }, dropAreaRef] = useDrop<OrderIngredientItem, void, { isOver: boolean }>({
    accept: Object.values(dndAcceptTypesMap),
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    })
  }, [dndAcceptTypesMap, handleDrop])

  const isBunType = expectType === IngredientType.BUN

  const [dropAreaStyles, contentStyle] = useMemo(() => [
    !children
    ? style.droparea
    : isOver
        ? isBunType ? style.droparea : style.droparea_expanded
        : style.droparea_collapsed,

    !children
      ? style.content_collapsed
      : isOver && isBunType
        ? style.content_collapsed
        : style.content,
  ], [children, isBunType, isOver])

  return (
    <li className={style.container} ref={dropAreaRef}>
      <div className={dropAreaStyles}>
        <p className='text text_type_main-default text_color_inactive'>
          {`Добавьте ${isBunType ? 'булку' : 'ингредиент'}`}
        </p>
      </div>
      <div className={contentStyle}>
        {children}
      </div>
    </li>
  )
}
