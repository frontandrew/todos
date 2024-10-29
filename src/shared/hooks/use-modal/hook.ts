import { useState } from 'react'
import { useHotKey } from 'hooks'

import { UseModalType } from './type'

export const useModal: UseModalType = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    if (props?.openHandler instanceof Function) props?.openHandler()
    setIsModalOpen(true)
  }
  const closeModal = () => {
    if (props?.closeHandler instanceof Function) props?.closeHandler()
    setIsModalOpen(false)
  }
  const toggleModal = () => {
    if (!isModalOpen) openModal()
    if (isModalOpen) closeModal()
  }

  useHotKey(closeModal, 'Escape')

  return { openModal, closeModal, toggleModal, isModalOpen }
}
