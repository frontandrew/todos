import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from 'api'

import { User } from './type'

const initState: { user: User | null } = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  selectors: {
    user: ({ user }) =>  user
  },
  reducers: {},
  extraReducers: (builder) => builder
    .addMatcher(apiSlice.endpoints.loginUser.matchFulfilled, (state, { payload } ) => {
      state.user = payload
    })
    .addMatcher(apiSlice.endpoints.logoutUser.matchFulfilled, (state) => {
      state.user = null
    })
    .addMatcher(apiSlice.endpoints.getUser.matchFulfilled, (state, { payload }) => {
      state.user = payload
    })
    .addMatcher(apiSlice.endpoints.updateUser.matchFulfilled, (state, { payload }) => {
      state.user = payload
    })
    .addMatcher(apiSlice.endpoints.registerUser.matchFulfilled, (state, { payload }) => {
      state.user = payload
    })
})
