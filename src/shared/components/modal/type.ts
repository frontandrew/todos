import { PropsWithChildren, ReactNode } from 'react'

interface Props {
  close: () => void
  title?: string | ReactNode
  root?: HTMLElement
  isVisible: boolean
}

export type ModalProps = PropsWithChildren<Props>

document.getElementsByName
