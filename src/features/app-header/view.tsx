import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'uikit'
import { NavItem } from 'components'

import { appHeaderItems } from './items'
import style from './style.module.css'

export const AppHeader: FC = () => (
  <header className={style.header}>
    <nav className={style.container}>
      <Link to={'/'} className={style.logo}>
        <Logo/>
      </Link>
      <ul className={style.list}>
        {Object.entries(appHeaderItems).map(([key, item]) =>
          <li className={item.to ? style.item : style.item_spacer} key={key}>
            {item.to && <NavItem {...item} size={'small'}/>}
          </li>,
        )}
      </ul>
    </nav>
  </header>
)
