import { FC } from 'react'
import { NavItem } from 'components'

import { navItems } from './items'
import style from './style.module.css'

export const ProfileNav: FC = () => {
  return (
    <div className={style.container}>
        <nav>
          <ul className={style.list}>
            {Object.entries(navItems).map(([key, item]) =>
            <li className={style.item} key={key}>
              <NavItem {...item} size={'medium'}/>
            </li>
            )}
          </ul>
        </nav>
        <span className={'text text_type_main-default text_color_inactive'}>
          В этом разделе вы можете<br/>изменить свои персональные данные
        </span>
    </div>
  )
}
