import { PropsWithChildren, SyntheticEvent } from 'react'

interface Props {
  isVisible: boolean
  onClick?: (e: SyntheticEvent) => void
  root?: HTMLElement
}

export type ModalOverlayProps = PropsWithChildren<Props>
