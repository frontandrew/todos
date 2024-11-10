import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from 'api';

export const appLoaderSlice = createSlice({
  name: 'appLoader',
  initialState: false,
  reducers: {},
  extraReducers: (listener) => listener
    .addMatcher(apiSlice.endpoints.getIngredients.matchPending, () => true)
    .addMatcher(apiSlice.endpoints.getIngredients.matchFulfilled, () => false)
    .addMatcher(apiSlice.endpoints.getIngredients.matchRejected, () => false)

    .addMatcher(apiSlice.endpoints.postOrder.matchPending, () => true)
    .addMatcher(apiSlice.endpoints.postOrder.matchFulfilled, () => false)
    .addMatcher(apiSlice.endpoints.postOrder.matchRejected, () => false)
})
