import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chats: null,
    selectedChat: null,
    loadingSelectedChat: false,
};

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers : {
        SET_CHATS(state, action){
            state.chats = [...action.payload];
        },
        ADD_CHAT(state, action){
            state.chats = [...state.chats, action.payload];
        },
        TOGGLE_LOADING_SELECTED_CHAT(state){
            state.loadingSelectedChat = state.loadingSelectedChat? false: true;
        },
        SET_SELECTED_CHAT(state, action){
            state.selectedChat = action.payload;
        },
        ADD_MESSAGE_TO_SELECTED_CHAT(state, action){
            state.selectedChat.messages = [
                ...state.selectedChat.messages, 
                {...action.payload}
            ];
        },
        CLEAR_SELECTED_CHAT(state){
            state.selectedChat = null;
        }
    }
});

export const selectChats = state => state.chat.chats;
export const selectCurrentChat = state => state.chat.selectedChat;
export const selectLaoding = state => state.chat.loadingSelectedChat;

export const { 
    SET_CHATS,
    ADD_CHAT,
    TOGGLE_LOADING_SELECTED_CHAT,
    SET_SELECTED_CHAT,
    ADD_MESSAGE_TO_SELECTED_CHAT,
    CLEAR_SELECTED_CHAT, 
} = chatSlice.actions;
export default chatSlice.reducer;