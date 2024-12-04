import { FC, useEffect, useState } from 'react'
import { Tab } from 'uikit'

import { TabsProps } from './type'
import style from './style.module.css'

export const Tabs: FC<TabsProps> = ({ onClick, tabsNameValueMap: tabs, currentTab }) => {
  const [current, setCurrent] = useState(currentTab)
  useEffect(() => setCurrent(currentTab), [currentTab])

  const handleClick = (tabName: keyof typeof tabs) => {
    if (onClick instanceof Function) onClick(tabName)
    setCurrent(tabName)
  }

  return (
    <div className={style.tabs} onClick={e => e.stopPropagation()}>
      {Object.entries(tabs).map(([key, value]) =>
        <Tab
          key={key}
          value={key}
          active={current === key}
          onClick={handleClick}
        >
          {value}
        </Tab>
      )}
    </div>
  )
}
