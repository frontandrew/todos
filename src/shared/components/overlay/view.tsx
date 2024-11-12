import { FC, SyntheticEvent, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { OverlayProps } from './type'
import style from './style.module.css'

export const Overlay: FC<OverlayProps> = (props) => {
  const { isVisible, children, onClick, root } = props

  const handeleClick = useCallback((event: SyntheticEvent) => {
    if (onClick) onClick(event)
  }, [onClick])

  return createPortal((
    <div
      className={`${style.backdrop} ${isVisible ? style.backdrop_hidden : ''}`}
      onClick={handeleClick}
    >
      {children}
    </div>
  ), root ?? document.body)
}
