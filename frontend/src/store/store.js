import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import userReducer from "./userSlice.js"
const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["auth.socket"],
        ignoredActions: ["auth/setSocket"],
      },
    }),
})

export default store