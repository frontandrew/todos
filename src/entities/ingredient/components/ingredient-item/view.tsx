import { FC } from 'react'

import { Ingredient } from '../../type'
import style from './style.module.css'
import { IngredientIcon } from 'entities/ingredient'
import { PriceWithCurrency } from 'components'

export const IngredientItem: FC<Ingredient> = (props) => {

  return (
    <div className={style.container}>
      <IngredientIcon {...props}/>
      <div className={style.title}>
        <h3 className={'text text_type_main-default'}>{props.name}</h3>
      </div>
      <div className={style.price}>
        {props.count &&
          <span className={'text text_type_digits-default'}>
            {`${props.count}\u00A0x\u00A0`}
          </span>
        }
        <PriceWithCurrency value={props.price}/>
      </div>
    </div>
  )
}
