import { FC } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlayProps } from './type'
import style from './style.module.css'

export const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  const { isVisible, children, onClick, root } = props

  return createPortal((
    <div
      className={`${isVisible ? style.backdrop : style.backdrop_hidden}`}
      onClick={onClick}
    >
      {children}
    </div>
  ), root ?? document.body)
}
