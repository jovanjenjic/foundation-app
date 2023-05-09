import { configureStore } from '@reduxjs/toolkit'
import { employeesApi } from '../redux/api/employee/employeeAPI';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({}).concat([employeesApi.middleware]),
})

setupListeners(store.dispatch);