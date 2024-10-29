import { PropsWithChildren } from 'react'

interface Props {
  tabsNameValueMap: Record<string, string>
  initialTab?: string
  onClick?: (x: string) => void
}

export type TabsProps = PropsWithChildren<Props>
