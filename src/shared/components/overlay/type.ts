import { PropsWithChildren, SyntheticEvent } from 'react'

interface Props {
  isVisible: boolean
  onClick?: (e: SyntheticEvent) => void
  root?: HTMLElement
}

export type OverlayProps = PropsWithChildren<Props>
