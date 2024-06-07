import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../UserSlice";

export const store = configureStore({
    reducer: {
        cartReducer
    }
})