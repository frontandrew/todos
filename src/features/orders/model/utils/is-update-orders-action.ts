import { isAction } from '@reduxjs/toolkit'
import { wsActionNames } from 'api'

import { ordersSlice } from '../model'
import { isOrdersResponse } from '../utils'
import { OrdersUpdateAction } from '../type'

export const isUpdateOrdersAction = (action: unknown): action is OrdersUpdateAction =>
  isAction(action)
  && action.type === `${ordersSlice.name}/${wsActionNames.message}`
  && 'payload' in action
  && isOrdersResponse(action.payload)
