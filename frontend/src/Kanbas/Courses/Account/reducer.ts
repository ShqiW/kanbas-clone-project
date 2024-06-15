import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
};
const accountReducer = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});
export const { setCurrentUser } = accountReducer.actions;
export default accountReducer.reducer;