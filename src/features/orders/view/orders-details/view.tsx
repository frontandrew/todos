import { FC, useMemo } from 'react'
import { useAppSelector } from 'hooks'

import { ordersSlice } from '../../model'

import style from './style.module.css'

/**
 * Этот компонент не управляет процессм получения данных для себя!
 *
 * Получать данные может только OrdersList. Поскольку OrdersDetails
 * на текущий момент используется только в паре с OrdersList, а OrdersList
 * в свою очередь используется в нескольких местах и получает общие для
 * обоих компонентов данные - было принято решение не усложнять процесс
 * получения этих данных.
 */

export const OrdersDetails: FC = () => {
  const { total, totalToday, orders } = useAppSelector(ordersSlice.selectors.state)

  const [readyOrders, progressOrders] = useMemo(() => {
    return [
      orders.filter(({ status }) => status === 'done').splice(0, 12),
      orders.filter(({ status }) => status !== 'done').splice(0, 12),
    ]
  }, [orders])

  return (
    <article className={style.container}>

      <div className={style.table}>
        <p className={'text text_type_main-medium'}>Готовы:</p>
        <p className={'text text_type_main-medium'}>В работе:</p>

        <div className={style.cell}>
          {readyOrders.length < 1 ? null : readyOrders.map(({ number }) => (
            <span
              className={'text text_type_digits-default text_color_success'}
              key={number}
            >
                {number}
              </span>
          ))}
        </div>

        <div className={style.cell}>
          {progressOrders.length < 1 ? null : progressOrders.map(({ number }) => (
            <span
              className={'text text_type_digits-default'}
            >
              {number}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className={'text text_type_main-medium'}>Выполнено за все время:</p>
        <p className={'text text_type_digits-large ' + style.text_glow}>{total ?? 0}</p>
      </div>

      <div>
        <p className={'text text_type_main-medium'}>Выполнено за сегодня:</p>
        <p className={'text text_type_digits-large ' + style.text_glow}>{totalToday ?? 0}</p>
      </div>
    </article>
  )
}
