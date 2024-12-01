import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'hooks'

import { Ingredient } from '../../type'
import { IngredientNutrients } from './components'
import style from './style.module.css'

export const IngredientDetails: FC = () => {
  const [data, setData] = useState<Ingredient | undefined>()
  const params = useParams()
  const ingredients = useAppSelector(state => state.ingredients)

  useEffect(() => {
    const data = ingredients.find(({ id }) => id === params.ingredientId)
    setData(data)
  }, [ingredients, params.ingredientId])


  return (data &&
    <article className={style.container}>
      <img className={style.image} src={data.imageLarge} alt={data.name}/>
      <h4 className={'text text_type_main-medium pt-4 pb-8'}>{data.name}</h4>
      <IngredientNutrients {...{
        carbohydrates: data.carbohydrates,
        calories: data.calories,
        proteins: data.proteins,
        fat: data.fat,
      }}/>
    </article>
  )
}
