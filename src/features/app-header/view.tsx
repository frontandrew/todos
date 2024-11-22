import { Logo } from 'uikit'
import { FC } from 'react'
import { NavItem } from 'components'

import { appHeaderItems } from './items'
import style from './style.module.css'

export const AppHeader: FC = () => {
  return (
    <header className={style.header}>
      <nav className={style.container}>
        <Logo className={style.logo}/>
        <ul className={style.list}>
          {Object.entries(appHeaderItems).map(([key, item]) =>
            <li className={item.to ? style.item : style.item_spacer} key={key}>
              {item.to && <NavItem {...item} size={'small'}/>}
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
