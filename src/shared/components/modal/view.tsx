import { FC } from 'react'
import { CloseIcon } from 'uikit'
import { Overlay } from 'components'

import { ModalProps } from './type'
import style from './style.module.css'

export const Modal: FC<ModalProps> = ({ children, title, close, isVisible, root }) => (
  <Overlay root={root} onClick={close} isVisible={isVisible}>
    <section
      className={style.container + ' p-10'}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={style.header}>
        {title && typeof title === 'string'
          ? <h4 className={'text text_type_main-large'}>{title}</h4>
          : title
        }
        <CloseIcon type='primary' onClick={close} />
      </div>
      <div className={style.content}>
        {children}
      </div>
    </section >
  </Overlay>
)
