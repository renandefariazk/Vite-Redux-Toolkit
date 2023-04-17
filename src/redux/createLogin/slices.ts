import { createSlice } from "@reduxjs/toolkit";
import { createLogin } from "./thunks";

export const slice = createSlice({
  name: "createLogin",
  initialState:{
    // data: {},
    isLogged: false,
    loading: false,
    isSuccess: false,
    message: ""

  },
  reducers:{
  },
  extraReducers: (build) => {
    build.addCase(createLogin.pending, (state) => {
      state.loading = true
    }),
    build.addCase(createLogin.fulfilled, (state, action) => {
      state.loading = false,
      // state.data = action.payload,
      state.isSuccess = true
    }),
    build.addCase(createLogin.rejected, (state) => {
      state.isSuccess = false
      // state.message = action.payload
    })
  }
})

// export const { logout } = slice.actions;

export const loginCreate = (state: any) => state.createLogin;

export default slice.reducer;