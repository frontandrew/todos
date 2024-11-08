import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from 'uikit'

import { IngredientViewType } from '../type'
import { IngredientItemProps } from './type'
import style from './style.module.css'

export const IngredientItem: FC<IngredientItemProps> = ({ ingredient, isLocked, type }) => {
  const { name, id, image, price } = ingredient

  const [{ isDrag }, cardRef] = useDrag({
    type: IngredientViewType.ITEM,
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  })

  return (
    <div
      className={isDrag ? style.container_dragging : style.container}
      {...{ ref: !isLocked ? cardRef : null }}
    >
      {!isLocked && <DragIcon type='primary' />}
      <ConstructorElement
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
