import { FC, PropsWithChildren } from 'react'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'

interface Props {
  to: string
  title: string
  Icon: FC<TIconProps>
}

export type AppHeaderItemProps = PropsWithChildren<Props>
