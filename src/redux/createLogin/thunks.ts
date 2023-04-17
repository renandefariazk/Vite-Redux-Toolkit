import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notify } from "../../utils/notification";
const env = import.meta.env;

export const createLogin = createAsyncThunk<any, any>(
  `create/login`,
  async ({data, onSuccess}, { rejectWithValue }) => {
    try {
      // data.token = env.VITE_TOKEN;

      const login = await axios.post(env.VITE_API_URL + `/login`, data);
      notify("success", "Conta Criada com Sucesso");

      onSuccess && onSuccess();
      return login.data;
      
    } catch (error: any) {
      notify("error", "Error ao Criar uma Conta");
      console.log("Error", error);
      return rejectWithValue(error.response.data);
    }
  }
);