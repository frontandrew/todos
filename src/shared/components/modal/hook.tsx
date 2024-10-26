import { FC, PropsWithChildren, useState } from 'react';

import { ModalProps } from './type'
import { Modal } from './view';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)

  const close = () => setIsOpen(false)

  const toggle = () => {
    if (!isOpen) open()
    if (isOpen) close()
  }

  const View: FC<PropsWithChildren<Omit<ModalProps, 'isOpen' | 'close'>>> = (props) => (
    <Modal {...props} isOpen={isOpen} close={close} />
  )

  return { Modal: View, open, close, toggle, isOpen }
}
