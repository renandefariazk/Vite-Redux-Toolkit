// import { Dispatch, Middleware } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../redux/store";
const env = import.meta.env;

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {},
});



// export const applyQueryString = (
//   url: string,
//   payload: Record<string, any>
// ): string => {
//   const validObject: Record<string, any> = {};

//   delete payload.dirty;

//   for (const [param, value] of Object.entries(payload)) {
//     if (value) Object.assign(validObject, { [param]: value });
//   }

//   if (Object.keys(validObject).length === 0) {
//     return url;
//   }

//   const searchParams = new URLSearchParams(validObject).toString();

//   return `${url}?${searchParams}`;
// };


export const applyQueryString = (
  url: string,
  payload: Record<string, any>
): string => {
  const validObject: Record<string, any> = {};

  let queryParams = "";
  delete payload.dirty;

  for (const [param, value] of Object.entries(payload)) {
    if (value) Object.assign(validObject, { [param]: value });
  }

  if (Object.keys(validObject).length === 0) {
    return url;
  }

  for (const item in validObject) {
    const query = `filter[${item}]=${validObject[item]}`;
    queryParams += query + "&";
  }
  console.log("queryparams", queryParams);

  console.log("validObject", validObject);

  const searchParams = new URLSearchParams(validObject).toString();

  console.log("searchparams:", searchParams);

  return `${url}?${queryParams}`;
};


// export const authRehydrateAccessToken = ({ payload }: Record<string, any>) => {
//   if (!payload?.auth?.data) return;
//   const { token } = payload.auth.data;
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   }
// };

// export const authRehydrateAccessToken: Middleware = () => {
//   return (next: Dispatch) => (action) => {
//     console.log("Action", action)
//     if (action?.payload?.auth?.data?.token) {
//       const { token } = action.payload.auth.data;
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//     return next(action);
//   };
// };

export const authRehydrateAccessToken = (store: any) => (next: any) => (action: any) => {
  const state: RootState = store.getState();
  const token = state.user.data?.access_token;
  
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // console.log("AUTH", api.defaults.headers.common["Authorization"]);

  return next(action);
};


// export const formDataBuilder = (payload: Record<string, any>): FormData => {
//   const formData = new FormData();

//   for (const [param, value] of Object.entries(payload)) {
//     if (value instanceof File) {
//       formData.append(param, value, value.name);
//     } else if (value instanceof FileList) {
//       for (let i = 0; i < value.length; i++) {
//         formData.append(`${param}[]`, value[i], value[i].name);
//       }
//     } else if (value) {
//       formData.append(param, value);
//     }
//   }

//   return formData;
// };
