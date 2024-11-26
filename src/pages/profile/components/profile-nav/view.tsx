import { FC, SyntheticEvent } from 'react'
import { NavItem } from 'components'

import { useAppDispatch } from 'hooks'
import { apiSlice } from 'api'

import { navItems } from './items'
import style from './style.module.css'

export const ProfileNav: FC = () => {
  const dispatch = useAppDispatch()
  const { logoutUser } = apiSlice.endpoints

  const handleLogout = (event: SyntheticEvent) => {
    event.stopPropagation()

    const token = localStorage.getItem('refreshToken')
    if (token) dispatch(logoutUser.initiate(token))
  }

  return (
    <div className={style.container}>
      <nav>
        <ul className={style.list}>
          {Object.entries(navItems).map(([key, item]) =>
            <li className={style.item} key={key}>
              <NavItem {...item} size={'medium'}/>
            </li>,
          )}
          <li className={style.item} key={'logout'}>
            <div onClick={handleLogout}>
              <NavItem to={''} title={'Выход'} size={'medium'}/>
            </div>
          </li>
        </ul>
      </nav>
      <span className={'text text_type_main-default text_color_inactive'}>
        В этом разделе вы можете<br/>изменить свои персональные данные
      </span>
    </div>
  )
}
