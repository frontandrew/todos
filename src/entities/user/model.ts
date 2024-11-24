import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from './type'

const initState: { user: User | null } = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
    },
    resetUser: (state) => {
      state.user = initState.user
    },
  },
})
