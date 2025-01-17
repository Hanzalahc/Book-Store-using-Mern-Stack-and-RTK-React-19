import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    status: false,
    role: null,
    email: null,
  },
  reducers: {
    setAdminLogin(state, action) {
      (state.status = true),
        (state.role = action.payload.role),
        (state.email = action.payload.email);
    },
    setAdminLogout(state) {
      (state.status = false), (state.role = null), (state.email = null);
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice;
