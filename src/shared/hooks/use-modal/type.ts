type FuncType = () => void

export type UseModalType = (x?: {
  openHandler?: FuncType
  closeHandler?: FuncType
}) => {
  openModal: FuncType
  closeModal: FuncType
  toggleModal: FuncType
  isModalOpen: boolean
}
