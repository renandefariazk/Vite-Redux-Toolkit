import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "./thunks";

export const slice = createSlice({
  name: "user",
  initialState:{
    data: {},
    isLogged: false,
    loading: false,
    isSuccess: false,
    message: ""

  },
  reducers:{
    // changeUser(state, {payload}){
    //   return{
    //     ...state, data: payload, isLogged: true
    //   }
    // },
    logout(state){
      return { ...state, data: {}, isLogged: false, isSuccess: false, loading: false }
    }
  },
  extraReducers: (build) => {
    build.addCase(getAuth.pending, (state) => {
      state.loading = true
    }),
    build.addCase(getAuth.fulfilled, (state, action) => {
      state.loading = false,
      state.data = action.payload,
      state.isSuccess = true
    }),
    build.addCase(getAuth.rejected, (state) => {
      state.isSuccess = false
      // state.message = payload
    })
  }
  // extraReducers: {
  //   [getAuth.pending]: (state: any, {payload}: any) => {
  //     state.loading = true,
  //   },
  //   [getAuth.fulfilled]: (state: any, {payload}: any) => {
  //     state.loading = true,
  //     state.data = payload,
  //     state.isSuccess = true
  //   },
  //   [getAuth.rejected] : (state: any, {payload}: any) => {
  //     state.isSuccess = false
  //     state.message = payload
  //   }
  // }
})

// export const { changeUser, logout } = slice.actions;
export const { logout } = slice.actions;

export const selectUser = (state: any) => state.user;

export default slice.reducer;