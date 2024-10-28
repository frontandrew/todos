import { FC, SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlayProps } from './type'
import style from './style.module.css'

export const ModalOverlay: FC<ModalOverlayProps> = ({ isVisible, children, onClick, root }) => {

  const handleOverlayClick = (event: SyntheticEvent) => {
    if (onClick instanceof Function) onClick(event)
    event.stopPropagation()
  }

  return createPortal((
    <div
      className={`${isVisible ? style.backdrop : style.backdrop_hidden}`}
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  ),
    root ?? document.body
  )
}
