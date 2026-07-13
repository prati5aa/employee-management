import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from '../store/employee/employeeSlice'
import authReducer from '../store/auth/authSlice'



export const store = configureStore({
  reducer: {
     employees: employeeReducer,
    auth: authReducer,
  },
});


export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;