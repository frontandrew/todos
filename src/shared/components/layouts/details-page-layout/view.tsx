import { FC } from 'react'

import { DetailsPageLayoutProps } from './type.ts'
import style from './style.module.css'

export const DetailsPageLayout: FC<DetailsPageLayoutProps> = ({children}) => (
  <div className={style.layout}>
    {children}
  </div>
)
