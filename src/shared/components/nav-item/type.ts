import { FC, PropsWithChildren } from 'react'
import { TIconProps } from 'uikit'

interface Props {
  to: string
  title: string
  size?: 'small' | 'medium' | 'large' | 'default'
  Icon?: FC<TIconProps>
}

export type NavItemProps = PropsWithChildren<Props>
