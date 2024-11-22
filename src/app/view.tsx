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

import style from './style.module.css'

export const App: FC = () => {
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
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/forgot-password" element={<ForgotPassPage/>}/>
            <Route path="/reset-password" element={<ResetPassPage/>}/>
            <Route path="/ingredients/:id" element={<IngredientPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Routes>
        </main>
        <AppLoader/>
      </BrowserRouter>
    </div>
  )
}
