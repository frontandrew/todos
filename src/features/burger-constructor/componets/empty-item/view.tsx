import { FC, useCallback, useMemo } from 'react'
import { useDrop } from 'react-dnd'

import { useAppDispatch } from 'hooks'
import { ConstructorElement } from 'uikit'
import { currentOrderSlice, OrderIngredientItem } from 'entities/order'
import { IngredientItem, IngredientType, IngredientViewType } from 'entities/ingredient'

import { EmptyItemProps } from './type'
import style from './style.module.css'

export const EmptyItem: FC<EmptyItemProps> = ({ orderIngredient: ingr, position, expectType }) => {
  const isBunType = expectType === IngredientType.BUN

  const {
    addOrderIngredient,
    removeOrderIngredient,
    sortOrderIngredients,
  } = currentOrderSlice.actions
  const dispatch = useAppDispatch()

  const handleDrop: (x: OrderIngredientItem) => void = useCallback((item) => {
    if (!item.orderIngredientIndex) {

      if (isBunType && ingr) dispatch(removeOrderIngredient({
        orderId: ingr.orderIngredientIndex,
        ingrId: ingr.id,
      }))
      dispatch(addOrderIngredient({ item, targId: ingr?.orderIngredientIndex }))
    } else dispatch(sortOrderIngredients({
      currId: item.orderIngredientIndex,
      targId: ingr!.orderIngredientIndex,
    }))
  }, [addOrderIngredient, dispatch, ingr, isBunType, removeOrderIngredient, sortOrderIngredients])

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
    }),
  }, [dndAcceptTypesMap, handleDrop])

  const [dropAreaStyles, contentStyle] = useMemo(() => [
    !ingr
      ? style.droparea
      : isOver
        ? isBunType ? style.droparea : style.droparea_expanded
        : style.droparea_collapsed,

    !ingr
      ? style.content_collapsed
      : isOver && isBunType
        ? style.content_collapsed
        : style.content,
  ], [isBunType, isOver, ingr])

  return (
    <li className={style.container} ref={dropAreaRef}>
      <div className={dropAreaStyles}>
        <div className={style.empty_container}>
          <div className={style.empty_item}>
            <p className={'text text_type_main-default'}>
              {`Добавьте ${isBunType ? 'булку' : 'ингредиент'}`}
            </p>
            <ConstructorElement
              text={'filler text filler text filler text'}
              thumbnail={'null'}
              price={0}
              type={position}
            />
          </div>
        </div>
      </div>
      <div className={contentStyle}>
        {ingr &&
          <IngredientItem
            ingredient={ingr}
            position={position}
            isLocked={isBunType}
          />
        }
      </div>
    </li>
  )
}
