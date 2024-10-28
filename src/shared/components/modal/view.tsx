import { FC } from 'react';
import { CloseIcon } from 'uikit';

import { ModalProps } from './type'
import style from './style.module.css'

export const Modal: FC<ModalProps> = ({ children, title, close }) => (
  <section
    className={style.container + ' p-10'}
    onClick={(e) => e.stopPropagation()}
  >
    <div className={style.header}>
      <h4 className={'text text_type_main-large'}>{title}</h4>
      <CloseIcon type='primary' onClick={close} />
    </div>
    <div className={style.content}>
      {children}
    </div>
  </section >
)
