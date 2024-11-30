import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'hooks'

import { Ingredient } from '../../type'
import { IngredientNutrients } from './components'
import style from './style.module.css'

export const IngredientDetails: FC = () => {
  const [data, setData] = useState<Ingredient | undefined>()
  const location = useLocation()
  const ingredients = useAppSelector(state => state.ingredients)

  useEffect(() => {
    if (location.pathname.startsWith('/ingredients/')) {
      const ingredientId = location.pathname.split('/').reverse()[0]
      const data = ingredients.find(({ id }) => id === ingredientId)

      setData(data)
    }
  }, [location, ingredients])


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
