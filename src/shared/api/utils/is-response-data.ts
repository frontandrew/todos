import { QueryResponseData } from '../queries/type'


export const isResponseData = (res: unknown): res is QueryResponseData =>
  typeof res === 'object' && res !== null &&
  'success' in res && res.success === true
