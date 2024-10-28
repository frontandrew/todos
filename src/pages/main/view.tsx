import { FC } from 'react'

import { BurgerIngredients } from 'features/burger-ingredients'
import { BurgerConstructor } from 'features/burger-constructor'
import { Ingredient } from 'entities/ingredient'

import style from './style.module.css'

export const Main: FC<{ ingredients: Ingredient[] }> = ({ ingredients }) => {
  return (
    <div className={style.container}>
      <section className={style.content}>
        <BurgerIngredients />
      </section>
      <section className={style.content}>
        <BurgerConstructor
          order={{ id: 134232, ingredients, total: 610, date: new Date(), status: 'created' }}
        />
      </section>
    </div>
  )
}
