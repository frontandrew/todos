import { FC } from 'react'
import { CloseIcon } from 'uikit'
import { Overlay } from 'components'

import { ModalProps } from './type'
import style from './style.module.css'

export const Modal: FC<ModalProps> = ({ children, close, isVisible, root }) => (
  <Overlay root={root} onClick={close} isVisible={isVisible}>
    <section
      className={style.container}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseIcon
        className={style.leave}
        type="primary"
        onClick={close}
      />
      <div className={style.content}>
        {children}
      </div>
    </section>
  </Overlay>
)
