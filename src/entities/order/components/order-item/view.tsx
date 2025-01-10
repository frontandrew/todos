import { FC, memo } from 'react'
import { FormattedDate } from 'uikit'
import { PriceWithCurrency } from 'components'

import { OrderItemProps } from './type'
import style from './style.module.css'
import { OrderStatusesMap } from 'entities/order'
import { IngredientIcon } from 'entities/ingredient'

export const OrderItem: FC<OrderItemProps> = memo(({
    name,
    number,
    status: stat,
    createdAt,
    updatedAt,
    ingredients,
  }) => {
    const date = new Date(updatedAt ?? createdAt)
    const total = ingredients.reduce((acc, { price }) => acc + price, 0)
    const status = OrderStatusesMap[stat]
    const ifStatIsDoneClass = stat === 'done' ? ' text_color_success' : ''


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
          <span className={'text text_type_main-default' + ifStatIsDoneClass}>{status}</span>
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
