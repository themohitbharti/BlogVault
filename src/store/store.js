import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice"
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
    }
})

export default store