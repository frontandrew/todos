import { PropsWithChildren } from 'react'

interface Props {
  close: () => void
  root?: HTMLElement
  isVisible: boolean
}

export type ModalProps = PropsWithChildren<Props>
