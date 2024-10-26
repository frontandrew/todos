import { FC } from 'react'

import { Ingredient } from 'entities/ingredient'
import { IngredientNutrients } from './components'

import style from './style.module.css'

export const IngredientDetails: FC<Ingredient> = (ingredient) => {
  const { imageLarge = '', name = 'unknown', fat, proteins, calories, carbohydrates } = ingredient
  return (
    <article className={style.container}>
      <img className={style.image} src={imageLarge} alt={name} />
      <h4 className={'text text_type_main-medium pt-4 pb-8'}>{name}</h4>
      <IngredientNutrients {...{ calories, proteins, fat, carbohydrates }} />
    </article>
  )
}
