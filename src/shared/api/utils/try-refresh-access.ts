import { BaseQueryApi } from '@reduxjs/toolkit/query'

import { Token } from '../type'
import { baseQuery } from './base-query'
import { isAuthData } from './is-auth-data'

export const tryRefreshAccess = async (api: BaseQueryApi, extraOptions: object) => {
  try {

    /**
     * Check is refreshToken exist
     */
    const token = localStorage.getItem(Token.refresh)
    if (!token) {
      // console.error('No refresh token available')
      return Promise.reject({ message: 'No refresh token available', success: false })
    }

    /**
     * Try to refresh access tokens
     */
    const result = await baseQuery(
      {
        url: '/auth/token',
        method: 'POST',
        body: { token },
      },
      api,
      extraOptions,
    )

    /**
     * Check response data and write if tokens exists
     */
    if (isAuthData(result.data)) {
      localStorage.setItem(Token.access, result.data[Token.access])
      localStorage.setItem(Token.refresh, result.data[Token.refresh])

      // return result
    }
    return result

    // else {
    //   console.error(new Error('Failed to refresh token'))
    //   return result
    // }

  } catch (error) {
    console.error('Failed to reauthenticate', error)
    return Promise.reject(error)
  }
}
