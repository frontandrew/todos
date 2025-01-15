import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query'

import { JWT_EXPIRED_MESSAGE } from 'consts'

import { isAuthResponseData, isResponseData, isResponseError } from '../utils'
import { Token } from './type.ts'
import { baseQuery } from './base-query.ts'
import { accessQuery } from './access-query.ts'

export const apiQuery = async (args: FetchArgs, api: BaseQueryApi, extraOptions: object) => {

  /** Special user logout logic, accessToken existing doesn't matter */
  if (api.endpoint === 'logoutUser') {
    const body = { token: localStorage.getItem(Token.refresh) }
    const logoutResult = await baseQuery({ ...args, body }, api, extraOptions)

    /** If logout success - clear auth tokens */
    if (isResponseData(logoutResult.data) && logoutResult.data.success) localStorage.clear()

    return logoutResult
  }

  /**
   * Requests may need accessToken, if it doesn't exist - call refetch logic
   * First - try to request as is, authToken will set into headers by `baseQuery`
   * if this token exist
   */
  let result = await baseQuery(args, api, extraOptions)
  const { data, error } = result

  /** First - must find tokens if they exist and write to local storage */
  if (isAuthResponseData(data)) {
    localStorage.setItem(Token.access, data[Token.access])
    localStorage.setItem(Token.refresh, data[Token.refresh])
  }

  /** If error responded, must check error message on JWT_ERROR_MESSAGE */
  if (isResponseError(error) && error.data.message === JWT_EXPIRED_MESSAGE) {

    /** Now must try to write accessToken if it exists */
    const refreshedResult = await accessQuery(api, extraOptions)
    const { data } = refreshedResult

    /** Finally refetch original request */
    if (isResponseData(data) && data.success) result = await baseQuery(args, api, extraOptions)
  }

  return result
}
