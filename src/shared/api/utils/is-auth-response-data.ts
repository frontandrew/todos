import { AuthQueryResponseData, Token } from '../queries/type'


export const isAuthResponseData = (res: unknown): res is AuthQueryResponseData =>
  typeof res === 'object' && res !== null &&
  'success' in res && res.success === true &&
  Token.access in res && typeof res[Token.access] === 'string' &&
  Token.refresh in res && typeof res[Token.refresh] === 'string'
