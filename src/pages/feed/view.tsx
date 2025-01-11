import { FC } from 'react'
import { TwoColumnLayout } from 'components'

import { OrdersDetails, OrdersList } from 'features/orders'
import { appHeaderItems } from 'features/app-header'

import style from './style.module.css'

export const FeedPage: FC = () => (
  <div className={style.container}>
    <h2 className={'text text_type_main-large'}>
      {appHeaderItems.feed.title}
    </h2>
    <TwoColumnLayout
      left={<OrdersList affiliation={'all'}/>}
      right={<OrdersDetails/>}
    />
  </div>
)
