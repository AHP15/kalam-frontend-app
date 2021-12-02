import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contacts: null,
};

const contactSlice = createSlice({
    name:"contact",
    initialState,
    reducers : {
        SET_CONTACTS(state, action){
            state.contacts = [...action.payload];
        },
        ADD_CONTACT(state, action){
            state.contacts = [...state.contacts, action.payload];
        }
    }
});

export const selectContacts = state => state.contact.contacts;
export const { SET_CONTACTS, ADD_CONTACT } = contactSlice.actions;
export default contactSlice.reducer;