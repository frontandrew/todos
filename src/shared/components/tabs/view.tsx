import { FC, useEffect, useState } from 'react';
import { Tab } from 'uikit';

import { TabsProps } from './type'
import style from './style.module.css'

export const Tabs: FC<TabsProps> = ({ onClick, tabsNameValueMap: tabs, initialTab }) => {
  const [currentTab, setCurrentTab] = useState('')

  useEffect(() => { if (initialTab) setCurrentTab(initialTab) }, [])

  const handleTabClick = (tabName: keyof typeof tabs) => {
    if (onClick instanceof Function) onClick(tabName)
    setCurrentTab(tabName)
  }

  return (
    <div className={style.tabs} onClick={e => e.stopPropagation()}>
      {Object.entries(tabs).map(([key, value]) =>
        <Tab
          key={key}
          value={key}
          active={currentTab === key}
          onClick={handleTabClick}
        >
          {value}
        </Tab>
      )}
    </div>
  )
}
