import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FC } from 'react'

import { apiSlice } from 'api'
import {
  ForgotPassPage,
  IngredientPage,
  LoginPage,
  MainPage,
  ProfilePage,
  RegisterPage,
  ResetPassPage,
} from 'pages'

import { AppHeader } from 'features/app-header'
import { AppLoader } from 'features/app-loader'
import { OnlyAuth, OnlyUnAuth } from 'features/authentification'

import style from './style.module.css'

export const App: FC = () => {
  apiSlice.useGetUserQuery()
  apiSlice.useGetIngredientsQuery()

  return (
    <div className={style.container}>
      <BrowserRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <AppHeader/>
        <main className={style.content}>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>}/>}/>
            <Route path="/register" element={<OnlyUnAuth component={<RegisterPage/>}/>}/>
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassPage/>}/>}/>
            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassPage/>}/>}/>
            <Route path="/ingredients/:id" element={<IngredientPage/>}/>
            <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>}/>}/>
          </Routes>
        </main>
        <AppLoader/>
      </BrowserRouter>
    </div>
  )
}
