import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

export default function initStore() {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
}