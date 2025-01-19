import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { FC, useEffect } from 'react'

import {
  FeedPage,
  ForgotPassPage,
  IngredientPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  OrderPage,
  ProfilePage,
  RegisterPage,
  ResetPassPage,
} from 'pages'
import { useModal } from 'hooks'
import { Modal } from 'components'

import { OnlyAuth, OnlyUnAuth } from 'features/authentification'
import { OrderDetails } from 'features/order-details'
import { OrdersList } from 'features/orders'
import { IngredientDetails } from 'entities/ingredient'

import style from './style.module.css'

export const AppContent: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { backgroundLocation?: Location }

  const { closeModal, isModalOpen, openModal } = useModal({ closeHandler: () => navigate(-1) })

  useEffect(() => {
    if (state?.backgroundLocation) openModal()
  }, [state])

  return (
    <main className={style.content}>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="" element={<MainPage/>}/>
        <Route path="login" element={<OnlyUnAuth component={<LoginPage/>}/>}/>
        <Route path="register" element={<OnlyUnAuth component={<RegisterPage/>}/>}/>
        <Route path="forgot-password" element={<OnlyUnAuth component={<ForgotPassPage/>}/>}/>
        <Route path="reset-password" element={<OnlyUnAuth component={<ResetPassPage/>}/>}/>
        <Route path="ingredients/:ingredientId" element={<IngredientPage/>}/>
        <Route path="feed/:orderNumber" element={<OrderPage/>}/>
        <Route path="feed" element={<FeedPage/>}/>
        <Route path="profile" element={<OnlyAuth component={<ProfilePage/>}/>}>
          <Route path="orders" element={<OrdersList affiliation={'user'}/>}/>
        </Route>
        <Route path="profile/orders/:orderNumber" element={<OnlyAuth component={<OrderPage/>}/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="ingredients/:ingredientId" element={
            <Modal close={closeModal} isVisible={isModalOpen}>
              <IngredientDetails variant={'modal'}/>
            </Modal>
          }/>
          <Route path="feed/:orderNumber" element={
            <Modal
              close={closeModal}
              isVisible={isModalOpen}>
              <OrderDetails variant={'modal'}/>
            </Modal>
          }/>
          <Route path="profile/orders/:orderNumber" element={
            <Modal
              close={closeModal}
              isVisible={isModalOpen}>
              <OrderDetails variant={'modal'}/>
            </Modal>
          }/>
        </Routes>
      )}
    </main>
  )
}
