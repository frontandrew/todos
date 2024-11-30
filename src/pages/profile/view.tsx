import { FC } from 'react'

import { ProfileForm, ProfileNav } from './components'
import style from './style.module.css'
import { Outlet, useLocation } from 'react-router-dom'

export const ProfilePage: FC = () => {
  const { pathname } = useLocation()

  return (
    <div className={style.container}>
      <ProfileNav/>
      {pathname === '/profile'
        ? <ProfileForm/>
        : <Outlet/>
      }
    </div>
  )
}
