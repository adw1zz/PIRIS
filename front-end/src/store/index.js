import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { clientsSlice } from "./reducers/clients-reducer";

const rootReducer = combineReducers({
    clientsData: clientsSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
})