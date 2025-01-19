import { isAction } from '@reduxjs/toolkit'

import { wsActionNames } from '../constants'
import { ConnectWSAction } from '../type.ts'

export const isConnectWSAction = (action: unknown): action is ConnectWSAction => (
  isAction(action)
  && action.type.endsWith(wsActionNames.connect)
  && 'payload' in action
  && typeof action.payload === 'string'
)
