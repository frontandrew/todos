import { isAction } from '@reduxjs/toolkit'

import { wsActionNames } from '../constants'
import { DisconnectWSAction } from '../type.ts'

export const isDisconnectWSAction = (action: unknown): action is DisconnectWSAction => (
  isAction(action) && action.type.endsWith(wsActionNames.disconnect)
)
