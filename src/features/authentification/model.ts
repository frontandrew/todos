import { createSlice } from '@reduxjs/toolkit'

import { AuthState } from './type'
import { apiSlice } from 'api'

const initState: AuthState = {
  isAuthChecked: false,
}

export const authSlice = createSlice({
  name: 'authState',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => builder
    .addMatcher(apiSlice.endpoints.getUser.matchFulfilled, (state) => {
      state.isAuthChecked = true
    })
    .addMatcher(apiSlice.endpoints.getUser.matchRejected, (state) => {
      state.isAuthChecked = true
    }),
})
