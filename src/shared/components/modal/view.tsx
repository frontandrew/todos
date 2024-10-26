import { FC } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from 'uikit';

import { ModalProps } from './type'
import style from './style.module.css'

export const Modal: FC<ModalProps> = (props) => {
  const { children, title, root = document.body, isOpen = false, close } = props
  return createPortal((
    <div
      className={`${isOpen ? style.backdrop : style.backdrop_hidden}`}
      onClick={(e) => {
        e.stopPropagation()
        close()
      }}
    >
      <section
        className={style.container + ' p-10'}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={style.header}>
          <h4 className={'text text_type_main-large'}>{title}</h4>
          <CloseIcon type='primary' onClick={close} />
        </div>
        <div className={style.content}>
          {children}
        </div>
      </section >
    </div>
  ),
    root
  )
}
