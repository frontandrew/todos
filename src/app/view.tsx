import { BrowserRouter } from 'react-router-dom'
import { FC } from 'react'

import { ROOT_PATH } from 'consts'
import { apiSlice } from 'api'

import { AppHeader } from 'features/app-header'
import { AppLoader } from 'features/app-loader'

import { AppContent } from './components'
import style from './style.module.css'

export const App: FC = () => {
  apiSlice.useGetUserQuery()
  apiSlice.useGetIngredientsQuery()

  return (
    <div className={style.container}>
      <BrowserRouter
        basename={ROOT_PATH}
        future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
        <AppHeader/>
        <AppContent/>
        <AppLoader/>
      </BrowserRouter>
    </div>
  )
}
