import { createSlice } from '@reduxjs/toolkit';

const _user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    user:_user || null,
    isLoggedIn: _user? true:false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        LOGOUT(state){
            state.user = null
            state.isLoggedIn = false;
            localStorage.removeItem("user");
        },
        SET_USER(state, action){
            state.user = action.payload;
            state.isLoggedIn = true;
        }
    }
});

export const { 
    LOGOUT,
    SET_USER,
} = userSlice.actions;

export const selectLoggedIn = state => state.user.isLoggedIn;
export const selectUser = state => state.user.user;
export  default userSlice.reducer;