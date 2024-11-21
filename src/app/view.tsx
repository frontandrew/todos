import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FC } from 'react'

import { apiSlice } from 'api'
import {  LoginPage, MainPage, RegPage } from 'pages'

import { AppHeader } from 'features/app-header'
import { AppLoader } from 'features/app-loader'

import style from './style.module.css'

export const App: FC = () => {
  apiSlice.useGetIngredientsQuery()

  return (
    <div className={style.container}>
      <AppHeader/>
      <main className={style.content}>
        <BrowserRouter future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegPage/>}/>
          </Routes>
        </BrowserRouter>
      </main>
      <AppLoader />
    </div>
  )
}
