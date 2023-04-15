import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notify } from "../../utils/notification";
const env = import.meta.env;

export const getAuth = createAsyncThunk<any, any>(
  `auth/login`,
  async (data, { rejectWithValue }) => {
    try {
      // data.token = env.VITE_TOKEN;

      const login = await axios.post(env.VITE_API_URL + `/login`, data);
      notify("success", "Login Realizado");
      return login.data;
    } catch (error: any) {
      notify("error", "Credenciais incorretas");
      console.log("Error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// export const getlogin = createAsyncThunk<void, loginParams>(
//   `auth/getlogin`,
//   async (params: loginParams, { rejectWithValue }) => {
//     try {
//       await api.patch<void>(`/login`, params);
//       Alert.alert('Sucesso!');
//     } catch (error: any) {
//       Alert.alert('Error ao tentar Realizar Login', error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );