import { FC } from 'react'

import { IngredientCard } from 'entities/ingredient'

import { IngredientsGroupProps } from './type'
import style from './style.module.css'

export const IngredientsGroup: FC<IngredientsGroupProps> = (props) => {
  const { ingredients = [], categoryName, categoryId } = props
  return (
    <li className={style.container} id={categoryId} >
      <h3 className={'text text_type_main-medium'}>{categoryName}</h3>
      <ul className={style.list + ' pr-4 pl-4'}>
        {Array.isArray(ingredients) && ingredients.length > 0
          ? ingredients.map((ingr) => <IngredientCard {...ingr} key={ingr.id} />)
          : null
        }
      </ul>
    </li>
  )
}
