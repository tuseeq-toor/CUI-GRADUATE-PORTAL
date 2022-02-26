import { configureStore } from "@reduxjs/toolkit";
import userRoleReducer from "./roles";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: { auth: authReducer, userRoles: userRoleReducer },
});
