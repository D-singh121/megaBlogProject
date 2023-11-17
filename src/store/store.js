import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";


const myStore = configureStore({
    reducer: {
        auth : authSlice,
    }
})

export default myStore;