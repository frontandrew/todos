import { FC } from 'react'
import { useAppSelector } from 'hooks'
import { Overlay } from 'components'

import style from './style.module.css'

export const AppLoader: FC = () => {
  const isLoading = useAppSelector(state => state.appLoader)

  return (
    <Overlay isVisible={isLoading}>
      <div className={style.loader}>
        <span className={style.first} />
        <span className={style.second} />
        <span className={style.third} />
        <span className={style.fourth} />
      </div>
    </Overlay>
  )
}
