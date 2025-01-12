import { FC, ReactNode } from 'react'

import style from './style.module.css'

export const TwoColumnLayout: FC<{ left?: ReactNode, right?: ReactNode }> = ({ left, right }) => (
  <div className={style.layout}>
    <section className={style.content}>
      {left}
    </section>
    <section className={style.content}>
      {right}
    </section>
  </div>
)
