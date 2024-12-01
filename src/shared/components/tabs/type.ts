import { PropsWithChildren } from 'react'

interface Props {
  tabsNameValueMap: Record<string, string>
  currentTab: string
  onClick: (x: string) => void
}

export type TabsProps = PropsWithChildren<Props>
