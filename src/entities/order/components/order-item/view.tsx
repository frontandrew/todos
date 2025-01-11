import { FC, memo } from 'react'
import { FormattedDate } from 'uikit'
import { PriceWithCurrency } from 'components'

import { IngredientIcon } from 'entities/ingredient'

import { OrderItemProps } from './type'
import style from './style.module.css'
import { OrderStatusColored } from 'entities/order'

export const OrderItem: FC<OrderItemProps> = memo(({
    name,
    number,
    status,
    createdAt,
    updatedAt,
    ingredients,
  }) => {
    const date = new Date(updatedAt ?? createdAt)
    const total = ingredients.reduce((acc, { price }) => acc + price, 0)


    return (
      <article className={style.container}>
        <div className={style.header}>
          <p className={'text text_type_digits-default'}>{`#${number}`}</p>
          <FormattedDate
            className={'text text_type_main-default text_color_inactive'}
            date={date}
          />
        </div>
        <div className={style.title}>
          <h3 className={'text text_type_main-medium'}>{name}</h3>
          <OrderStatusColored text={status}/>
        </div>
        <div className={style.details}>
          <ul className={style.components}>
            {ingredients.map(
              (ingredient, index) =>
                <li
                  className={style.component}
                  key={`${ingredient.id}-${index}`}
                >
                  <IngredientIcon {...ingredient}/>
                </li>
            )}
          </ul>
          <PriceWithCurrency value={total}/>
        </div>
      </article>
    )
  }, (prevProps, nextProps) =>
    prevProps.status === nextProps.status,
)
