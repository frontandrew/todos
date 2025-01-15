import { Action } from '@reduxjs/toolkit'
import { wsActionNames } from './constants'

export interface ConnectWSAction extends Action {
  type: `${string}/${typeof wsActionNames.connect}`
  payload: string
}

export interface DisconnectWSAction extends Action {
  type: `${string}/${typeof wsActionNames.disconnect}`
}
