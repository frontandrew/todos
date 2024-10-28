import { FC, useEffect, useState } from 'react'

import { Main } from 'pages'
import { AppHeader } from 'features/app-header'
import { Ingredient } from 'entities/ingredient'

import { formatIngredientsResponse, IngredientsResponseData } from 'utils'
import { INGREDIENTS_HOST } from 'consts'

import style from './style.module.css'

export const App: FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const result = async () => await fetch(INGREDIENTS_HOST)
      .then((response) => {
        const { status, statusText } = response

        if ((status >= 200) && (status <= 399)) return response.json()
        throw new Error(
          `request failed with status: ${status} by ${statusText || 'unknown reason'}.`
        )
      })
      .then(({ data }: { data: IngredientsResponseData }) => {
        setIngredients(formatIngredientsResponse(data))
      })
      .catch((reason) => {
        setHasError(Boolean(reason))
        console.error(reason)
      })
      .finally(() => setIsLoading(false))

    result()
  }, [])

  return (
    <div className={style.container}>
      <header className={style.header}>
        <AppHeader />
      </header>
      <main className={style.content}>
        <Main />
      </main>
    </div>
  )
}
