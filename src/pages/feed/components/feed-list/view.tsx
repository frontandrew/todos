import { FC } from 'react'

import { OrdersList } from 'features/orders'
import { appHeaderItems } from 'features/app-header'

import style from './style.module.css'

export const FeedList: FC = () => {
  return (
    <div className={style.container}>
        <h2 className={'text text_type_main-large'}>
          {appHeaderItems.feed.title}
        </h2>
        <OrdersList affiliation={'all'}/>
    </div>
  )
}
