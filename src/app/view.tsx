import { FC } from 'react'

import { apiSlice } from 'api'
import { Main } from 'pages'

import { AppHeader } from 'features/app-header'

import style from './style.module.css'

export const App: FC = () => {
  const { isLoading, isError, isSuccess } = apiSlice.useGetIngredientsQuery()

  return (
    <div className={style.container}>
      <header className={style.header}>
        <AppHeader />
      </header>
      <main className={style.content}>
        {isError && 'Error...'}
        {isLoading && <h3>Loading...</h3>}
        {isSuccess && <Main />}
      </main>
    </div>
  )
}
