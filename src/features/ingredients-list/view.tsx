import { FC } from 'react'

import { Ingredient, IngredientItem, IngredientType } from 'entities/ingredient'

import style from './style.module.css'

export const IngredientsList: FC<{ ingredients: Ingredient[] }> = ({ ingredients: ingrs }) => {

  /**
   * Protection from:
   * - no bun ingredient,
   * - double bun ingredient,
   * - no other ingredients situations
   */
  const [bunIngrs, otherIngrs] = [
    ingrs.filter(({ type }) => type === IngredientType.BUN),
    ingrs.filter(({ type }) => type !== IngredientType.BUN),
  ]

  const protectedIngrs = bunIngrs.length && otherIngrs.length
    ? [bunIngrs[0], ...otherIngrs]
    : []

  return (
    <ul className={style.container}>
      {protectedIngrs.length > 0 && protectedIngrs.map((ingr) => (
        <li className={style.item} key={ingr.id}>
          <IngredientItem {...ingr}/>
        </li>
      ))}
    </ul>
  )
}
