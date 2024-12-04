import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query'

import { JWT_EXPIRED_MESSAGE } from 'consts'

import { baseQuery, isAuthData, tryRefreshAccess } from './utils'
import { BaseQueryResponse, Token } from './type.ts'

export const query = async (args: FetchArgs, api: BaseQueryApi, extraOptions: object) => {

  /** Special user logout logic, accessToken existing doesn't matter */
  if (api.endpoint === 'logoutUser') {
    const logoutResult = await baseQuery(
      {
        ...args,
        /** Set refresh token as payload */
        body: { token: localStorage.getItem(Token.refresh) },
      },
      api,
      extraOptions,
    )

    /** If logout done - clear auth tokens */
    const { data } = logoutResult as unknown as BaseQueryResponse
    if (data?.success) localStorage.clear()

    return logoutResult
  }

  /**
   * Other requests may need accessToken, if it doesn't exist - call refetch logic
   * First - try to request as is, authToken will set into headers by `baseQuery`
   * if this token exist
   */
  let result = await baseQuery(args, api, extraOptions)
  const { data, error } = result as unknown as BaseQueryResponse

  /** First - must find tokens if they exist and write to local storage */
  if (isAuthData(data)) {
    localStorage.setItem(Token.access, data[Token.access])
    localStorage.setItem(Token.refresh, data[Token.refresh])
  }

  /** If error responded, must check error message on JWT_ERROR_MESSAGE */
  if (error && error.data.message === JWT_EXPIRED_MESSAGE) {

    /** Now must try to write accessToken if it exists */
    const refreshedResult = await tryRefreshAccess(api, extraOptions)
    const { data } = refreshedResult as unknown as BaseQueryResponse

    /** Finally - try to refetch original request */
    if (data?.success) {
      try {
        result = await baseQuery(args, api, extraOptions)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }

  return result
}
