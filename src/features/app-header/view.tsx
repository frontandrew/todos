import { Logo } from 'uikit'
import { FC } from 'react'

import { AppHeaderItem } from './components'
import { appHeaderItems } from './items'
import style from './style.module.css'

export const AppHeader: FC = () => {
  return (
    <header className={style.header}>
      <nav className={style.container}>
        <Logo className={style.logo}/>
        <ul className={style.list}>
          {Object.entries(appHeaderItems).map(([key, item], index) =>
            <>
              {index === 2 && <li className={style.spacer} key={'spacer'}></li>}
              <li className={style.item} key={key}>
                <AppHeaderItem {...item}/>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
