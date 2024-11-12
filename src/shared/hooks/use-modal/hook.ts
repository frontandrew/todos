import { useCallback, useState } from 'react'
import { useHotKey } from 'hooks'

import { UseModalType } from './type'

export const useModal: UseModalType = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback(() => {
    if (props?.openHandler instanceof Function) props?.openHandler()

    setIsModalOpen(true)
  }, [props])

  const closeModal = useCallback(() => {
    if (props?.closeHandler instanceof Function) props?.closeHandler()

    setIsModalOpen(false)
  }, [props])

  const toggleModal = useCallback(() => {
    if (!isModalOpen) openModal()
    if (isModalOpen) closeModal()
  }, [closeModal, isModalOpen, openModal])

  useHotKey(closeModal, 'Escape')

  return { openModal, closeModal, toggleModal, isModalOpen }
}
