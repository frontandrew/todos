import { FC, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from 'uikit'

import { IngredientViewType } from '../type'
import { IngredientItemProps } from './type'
import style from './style.module.css'
import { currentOrderSlice } from 'entities/order'
import { useAppDispatch } from 'hooks'

export const IngredientItem: FC<IngredientItemProps> = ({ ingredient, isLocked, type }) => {
  const { name, id, image, price, orderIngredientIndex } = ingredient

  const [{ isDrag }, cardRef] = useDrag({
    type: IngredientViewType.ITEM,
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  })

  const { removeOrderIngredient } = currentOrderSlice.actions
  const dispatch = useAppDispatch()

  const handleRemove = useCallback(() => {
    dispatch(removeOrderIngredient(orderIngredientIndex))
  }, [dispatch, orderIngredientIndex, removeOrderIngredient])

  return (
    <div
      className={isDrag ? style.container_dragging : style.container}
      {...{ ref: !isLocked ? cardRef : null }}
    >
      {!isLocked && <DragIcon type='primary' />}
      <ConstructorElement
        handleClose={handleRemove}
        key={id}
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={image}
      />
    </div>
  )
}
