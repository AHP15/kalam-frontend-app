import api from './api.js';

class ChatService{

    getChat(_chatId){
            return api.get("/get_chat",{
            headers: {
                id:_chatId
            },
        })
        .then(response => {
            return response.data;
        });
    }

    addMessage(content, user, chat){
        return api.post("/add_message", {
                _content: content,
                _userId: user,
                _chatId: chat,
        })
        .then(response => {
            return response.data;
        });
    }
}

export default new ChatService();