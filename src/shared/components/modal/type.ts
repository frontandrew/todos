import { PropsWithChildren } from 'react'

interface Props {
  close: () => void
  title?: string
  root?: HTMLElement
  isVisible: boolean
}

export type ModalProps = PropsWithChildren<Props>

document.getElementsByName
