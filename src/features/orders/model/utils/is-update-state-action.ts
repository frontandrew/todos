import { isAction } from '@reduxjs/toolkit'
import { wsActionNames } from 'api'

import { ordersSlice } from '../model'
import { OrdersStateAction } from '../type'

export const isUpdateStateAction = (action: unknown): action is OrdersStateAction =>
  isAction(action)
  && action.type === `${ordersSlice.name}/${wsActionNames.state}`
  && 'payload' in action
  && typeof action.payload === 'number'
