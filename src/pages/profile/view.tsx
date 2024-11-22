import { FC } from 'react'

import { ProfileForm, ProfileNav } from './components'
import style from './style.module.css'

export const ProfilePage: FC = () => {
  return (
    <div className={style.container}>
      <ProfileNav/>
      <ProfileForm/>
    </div>
  )
}
