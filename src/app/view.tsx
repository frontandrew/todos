import { FC } from 'react'

import { apiSlice } from 'api'
import { Main } from 'pages'

import { AppHeader } from 'features/app-header'
import { AppLoader } from 'features/app-loader'

import style from './style.module.css'

export const App: FC = () => {
  const { isSuccess } = apiSlice.useGetIngredientsQuery()

  return (
    <div className={style.container}>
      <AppHeader />
      <main className={style.content}>
        {isSuccess && <Main />}
      </main>
      <AppLoader />
    </div>
  )
}
