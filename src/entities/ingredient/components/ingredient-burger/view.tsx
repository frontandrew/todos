import { FC, useCallback } from 'react'
import { ConstructorElement } from 'uikit'

import { FromPositionPostfix, IngredientBurgerProps } from './type'
import { fromPositionPostfix } from './const'
import style from './style.module.css'

export const IngredientBurger: FC<IngredientBurgerProps> = ({ name, id, image, price, isLocked, position, removeHandler }) => {

  const handleRemove = useCallback(() => {
    if (removeHandler) removeHandler()
  }, [removeHandler])

  const printBunTypePostfix = useCallback(() => {
    if (!position) return ''
    if (position === FromPositionPostfix.TOP) {
      return ` (${fromPositionPostfix.top})`
    }
    return ` (${fromPositionPostfix.bottom})`
  }, [position])

  return (
      <ConstructorElement
        extraClass={style.element}
        handleClose={handleRemove}
        key={id}
        type={position}
        isLocked={isLocked}
        text={`${name}${printBunTypePostfix()}`}
        price={price}
        thumbnail={image}
      />
  )
}
