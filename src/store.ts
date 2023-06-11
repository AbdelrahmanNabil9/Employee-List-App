import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { employeeApi } from './api/employeeApi';
import employeeReducer from './features/employeeSlice';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeeApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;