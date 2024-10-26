import { PropsWithChildren } from 'react'

interface Props {
  isOpen: boolean
  close: () => void
  root?: HTMLElement
  title?: string
}

export type ModalProps = PropsWithChildren<Props>

document.getElementsByName
