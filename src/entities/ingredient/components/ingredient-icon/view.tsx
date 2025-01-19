import { FC } from 'react'

import { Ingredient } from '../../type'
import style from './style.module.css'

export const IngredientIcon: FC<Ingredient> = ({ imageMobile, name }) => {

  return (
    <div className={style.gradient}>
      <div className={style.container}>
        <img
          className={style.image}
          src={imageMobile}
          alt={name}
        />
      </div>
    </div>
  )
}
