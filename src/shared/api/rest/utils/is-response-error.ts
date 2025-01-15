import { QueryErrorData } from '../queries/type.ts'


export const isResponseError = (res: unknown): res is QueryErrorData =>
  typeof res === 'object' && res !== null &&
  'status' in res && typeof res.status === 'number' &&
  'data' in res && typeof res.data === 'object' && res.data !== null &&
  'success' in res.data && res.data.success === false &&
  'message' in res.data && typeof res.data.message === 'string'
