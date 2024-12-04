import { FC } from 'react'

import { IngredientDetails } from 'entities/ingredient'

import style from './style.module.css'

export const IngredientPage: FC = () => {
  return (
    <div className={style.container}>
      <h1 className={'text text_type_main-large'}>Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  )
}
