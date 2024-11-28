import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const appLoaderSlice = createSlice({
  name: 'appLoader',
  initialState: false,
  reducers: {
    setIsLoading: (_state, { payload }: PayloadAction<boolean>) => payload,
  },
})
