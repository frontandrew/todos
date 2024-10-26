import { FC } from 'react'

import {
  NutrientsNamesUnitsMap as map,
  NutrientsTypes as N,
  Props,
} from './type'
import style from './style.module.css'

export const IngredientNutrients: FC<Props> = (nutrients) => (
  <ul className={style.container}>
    {Object.entries(nutrients).map(([key, value]) => (
      <li className={style.nutrient} key={key}>
        <p className={'text text_type_main-default text_color_inactive'}>
          {`${map[key as N].name}, ${map[key as N].unit}`}
        </p>
        <p className={'text text_type_digits-default text_color_inactive'}>{value}</p>
      </li>
    ))}
  </ul>
)
