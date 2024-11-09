import { FC, useCallback, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from 'uikit'

import { currentOrderSlice } from 'entities/order'
import { useAppDispatch } from 'hooks'
import { IngredientType } from 'entities/ingredient/type'

import { IngredientViewType } from '../type'
import { IngredientItemProps } from './type'
import style from './style.module.css'

export const IngredientItem: FC<IngredientItemProps> = ({ ingredient, isLocked, position }) => {
  const { name, id, image, price, orderIngredientIndex, type } = ingredient

  /**
   * TODO: вынести вычисление принимаемых типов в отдельную
   * `entity/ingredient/components/utils`
   */
  const getDNDAcceptType = useMemo(() => (
    type === IngredientType.BUN ? IngredientType.BUN : 'other'
  ), [type])

  const [{ isDrag }, cardRef] = useDrag({
    type: `${IngredientViewType.ITEM}-${getDNDAcceptType}`,
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    }),
  }, [id])

  const { removeOrderIngredient } = currentOrderSlice.actions
  const dispatch = useAppDispatch()

  const handleRemove = useCallback(() => {
    dispatch(removeOrderIngredient({ orderId: orderIngredientIndex, ingrId: id }))
  }, [dispatch, id, orderIngredientIndex, removeOrderIngredient])

  return (
    <div
      className={isDrag ? style.container_dragging : style.container}
      {...{ ref: !isLocked ? cardRef : null }}
    >
      {!isLocked && <DragIcon type='primary' />}
      <ConstructorElement
        handleClose={handleRemove}
        key={id}
        type={position}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={image}
      />
    </div>
  )
}
