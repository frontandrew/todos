import { PropsWithChildren } from 'react'

interface Props {
  close: () => void
  title?: string
}

export type ModalProps = PropsWithChildren<Props>

document.getElementsByName
