import { Route, Routes } from 'react-router-dom'
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
import { OnlyAuth, OnlyUnAuth } from 'features/authentification'

import style from './style.module.css'

export const AppContent: FC = () => {
  return (
    <main className={style.content}>
      <Routes>
        <Route path="" element={<MainPage/>}/>
        <Route path="login" element={<OnlyUnAuth component={<LoginPage/>}/>}/>
        <Route path="register" element={<OnlyUnAuth component={<RegisterPage/>}/>}/>
        <Route path="forgot-password" element={<OnlyUnAuth component={<ForgotPassPage/>}/>}/>
        <Route path="reset-password" element={<OnlyUnAuth component={<ResetPassPage/>}/>}/>
        <Route path="ingredients/:id" element={<IngredientPage/>}/>
        <Route path="profile" element={<OnlyAuth component={<ProfilePage/>}/>}/>
      </Routes>
    </main>
  )
}
