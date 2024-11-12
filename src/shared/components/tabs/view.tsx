import { FC, useEffect, useRef, useState } from 'react'
import { Tab } from 'uikit'

import { TabsProps } from './type'
import style from './style.module.css'

export const Tabs: FC<TabsProps> = ({ onClick, tabsNameValueMap: tabs, initialTab }) => {
  const [currentTab, setCurrentTab] = useState('')
  const sectionRefs = useRef<(Element | null)[]>([])

  useEffect(() => {
    if (initialTab) setCurrentTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    const sectionsElements = Object.keys(tabs).map((tabId) => {
      return document.querySelector(`#${tabId}`)
    })

    sectionRefs.current = sectionsElements
  }, [tabs])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setCurrentTab(entry.target.id)
      })
    },
      { threshold: 0.5 }
    )

    sectionRefs.current.forEach((tab) => {
      if (tab) observer.observe(tab)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

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
