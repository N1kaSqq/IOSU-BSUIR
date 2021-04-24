import { createReducer } from '@reduxjs/toolkit';

import { setIsAuth, setUser } from './actions';

const initialState = {
    isAuth: false,
    user: {},
}

export default createReducer(initialState, (builder) => {
    builder
      .addCase(setIsAuth, (state, action) => {
        state.isAuth = action.payload;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
      })
  });