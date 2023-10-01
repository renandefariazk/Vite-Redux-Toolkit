// import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/slices";
import createLoginReducer from "./createLogin/slices";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
// import { authRehydrateAccessToken } from "../services/api";

// export default configureStore({
//   reducer:{
//     user: userReducer,
//   }
// })

const persistConfig = {
  key: "root",
  storage
}

const rootReducer = combineReducers({ 
  user: userReducer,
  createLogin: createLoginReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


// adicionando o Middleware authRehydrateAccessToken dentro do array de Middleware já existente

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(authRehydrateAccessToken),
// });



// Se você adicionar um middleware personalizado, como o authRehydrateAccessToken, ainda terá os middlewares padrão do Redux Toolkit, como teria se o array estivesse vazio.

// Isso porque, quando você passa um array vazio para o parâmetro middleware, o Redux Toolkit ainda adiciona os middlewares padrão,
// como o thunk, o immutableStateInvariant, o serializableCheck, entre outros.

// Adicionando um middleware personalizado, como o authRehydrateAccessToken, você está apenas adicionando mais um middleware à lista de middlewares
// que serão executados em ordem, após os middlewares padrão do Redux Toolkit

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [authRehydrateAccessToken],
// });



// Se você quiser usar apenas os middlewares padrão do Redux Toolkit, basta passar um array vazio para o parâmetro middleware

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [],
// });



// getDefaultMiddleware está Deprecated, Preterido

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware({
//     serializableCheck: false,
//   }),
// });



const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export {store, persistor};