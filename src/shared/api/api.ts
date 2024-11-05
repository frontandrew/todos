
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_HOST } from 'consts'
import { Ingredient } from 'entities/ingredient'

import { formatIngredientsResponse } from './utils'
import { IngredientsResponse } from './type'

export const apiSlice = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_HOST }),
  endpoints: (build) => ({
    getIngredients: build.query<Ingredient[], void>({
      query: () => ({ url: '/ingredients'}),
      transformResponse: ({ data }: { data: IngredientsResponse[] }) => formatIngredientsResponse(data)
    })
  })
})
