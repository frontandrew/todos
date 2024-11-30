import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { FC, useCallback } from 'react'

import {
  ForgotPassPage,
  IngredientPage,
  LoginPage,
  MainPage,
  ProfilePage,
  RegisterPage,
  ResetPassPage,
} from 'pages'
import { useModal } from 'hooks'
import { Modal } from 'components'

import { OnlyAuth, OnlyUnAuth } from 'features/authentification'
import { OrdersList } from 'features/orders-list'
import { IngredientDetails } from 'entities/ingredient'

import style from './style.module.css'

export const AppContent: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { backgroundLocation?: Location }

  const { closeModal } = useModal()

  const handelModalClose = useCallback(() => {
    closeModal()
    navigate(-1)
  }, [closeModal, navigate])

  return (
    <main className={style.content}>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="" element={<MainPage/>}/>
        <Route path="login" element={<OnlyUnAuth component={<LoginPage/>}/>}/>
        <Route path="register" element={<OnlyUnAuth component={<RegisterPage/>}/>}/>
        <Route path="forgot-password" element={<OnlyUnAuth component={<ForgotPassPage/>}/>}/>
        <Route path="reset-password" element={<OnlyUnAuth component={<ResetPassPage/>}/>}/>
        <Route path="ingredients/:id" element={<IngredientPage/>}/>
        <Route path="profile" element={<OnlyAuth component={<ProfilePage/>}/>}>
          <Route path="orders" element={<OrdersList/>}/>
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="ingredients/:id" element={
            <Modal title='Детали ингредиента' close={handelModalClose} isVisible={true}>
              <IngredientDetails />
            </Modal>
          }/>
        </Routes>
      )}
    </main>
  )
}
