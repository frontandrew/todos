import { FC, PropsWithChildren, useState } from 'react';
import { ModalOverlay } from 'components';
import { useHotKey } from 'hooks';

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

  useHotKey(close, 'Escape')

  const Component: FC<PropsWithChildren<Omit<ModalProps, 'close'>>> = (props) => (
    <ModalOverlay isVisible={isOpen} onClick={close}>
      <Modal {...props} close={close} />
    </ModalOverlay>
  )

  return { Modal: Component, open, close, toggle, isOpen }
}
