import { AuthQueryData, Token } from '../type'

export const isAuthData = (res: unknown): res is AuthQueryData =>
  typeof res === 'object' &&
  res !== null &&
  Token.refresh in res &&
  Token.access in res &&
  typeof res[Token.refresh] === 'string' &&
  typeof res[Token.access] === 'string'
