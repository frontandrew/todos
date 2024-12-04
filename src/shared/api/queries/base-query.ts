import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_HOST } from 'consts'

import { Token } from './type'

export const baseQuery = fetchBaseQuery({
  baseUrl: API_HOST,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(Token.access)
    if (token) headers.set('authorization', token)

    return headers
  },
})
