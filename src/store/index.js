import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "./page-slice";


const store = configureStore({reducer: {
    myPage: pageSlice.reducer,
} })

export default store;