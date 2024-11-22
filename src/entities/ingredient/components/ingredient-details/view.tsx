import { FC } from 'react'
import { useAppSelector } from 'hooks'

import { IngredientNutrients } from './components'
import style from './style.module.css'

export const IngredientDetails: FC = () => {
  const { ingredient: data } = useAppSelector(state => state.currentIngrdient)

  return (data &&
    <article className={style.container}>
      <img className={style.image} src={data.imageLarge} alt={data.name} />
      <h4 className={'text text_type_main-medium pt-4 pb-8'}>{data.name}</h4>
      <IngredientNutrients {...{
        carbohydrates: data.carbohydrates,
        calories: data.calories,
        proteins: data.proteins,
        fat: data.fat,
      }} />
    </article>
  )
}
