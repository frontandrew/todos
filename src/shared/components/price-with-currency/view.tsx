import { FC } from 'react'
import { CurrencyIcon } from 'uikit'
import style from './style.module.css'

export const PriceWithCurrency: FC<{ value: number }> = ({ value }) => (
  <div className={style.container}>
    <span className={'text text_type_digits-default'}>{value}</span>
    <CurrencyIcon type={'primary'}/>
  </div>
)
