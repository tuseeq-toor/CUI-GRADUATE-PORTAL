import { createSlice } from "@reduxjs/toolkit";
let initialState = { Roles: [] };
export const userRoleSlice = createSlice({
  name: "userRoles",
  initialState,
  reducers: {
    USERROLES: (state, action) => {
      state.Roles = action.payload;
    },
    // UPDATE_USERROLES: (state, action) => {
    //   state.Roles.push(action.payload);
    // },
    // setUserProgram: (state, action) => {
    //   state.userProgram = action.payload;
    // },
  },
});

export const { USERROLES } = userRoleSlice.actions;

export default userRoleSlice.reducer;
