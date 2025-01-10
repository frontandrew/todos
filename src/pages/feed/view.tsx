import { FC } from 'react'

import { FeedList } from './components'
import style from './style.module.css'

export const FeedPage: FC = () => {
  return (
    <div className={style.container}>
      <section className={style.content}>
        <FeedList/>
      </section>
      <section className={style.content}>

      </section>
    </div>
  )
}
