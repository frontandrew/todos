import { FC, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { DragIcon } from 'uikit'

import { IngredientType, IngredientViewType } from 'entities/ingredient'

import { IngredientItemDNDWrapperProps } from './type'
import style from './style.module.css'

export const IngredientItemDNDWrapper: FC<IngredientItemDNDWrapperProps> = ({ ingredient, isLocked, children }) => {

  /**
   * TODO: вынести вычисление принимаемых типов в отдельную
   * `entity/ingredient/components/utils`
   */
  const getDNDAcceptType = useMemo(() => (
    ingredient.type === IngredientType.BUN ? IngredientType.BUN : 'other'
  ), [ingredient])

  const [{ isDrag }, cardRef] = useDrag({
    type: `${IngredientViewType.ITEM}-${getDNDAcceptType}`,
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    }),
  }, [ingredient])

  return (
    <div
      className={isDrag ? style.container_dragging : style.container}
      {...{ ref: !isLocked ? cardRef : null }}
    >
      {!isLocked && <DragIcon type='primary' />}
      {children}
    </div>
  )
}
