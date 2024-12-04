import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query'

export enum Token {
  access = 'accessToken',
  refresh = 'refreshToken',
}

export interface QueryResponseData extends Record<string, unknown> {
  success: boolean,
}

export interface AuthQueryResponseData extends QueryResponseData {
  [Token.refresh]: string,
  [Token.access]: string
}

export interface QueryErrorData {
  status: number
  data: {
    success: false
    message: string
  }
}

export interface BaseQueryResponse {
  data?: QueryResponseData | AuthQueryResponseData
  error?: QueryErrorData
  meta: FetchBaseQueryMeta
}
