import api from './api';

class UserService {

  getUserBoard() {
    return api.get('/user_board')
          .then(response => {
            return response.data;
          });
  }

  addContact(contact_email){
    return api.post("/add_contact",{
             contactEmail: contact_email
          })
          .then(response => {
            return response.data;
          });
  }

  addChat(users, _name){
    return api.post("/add_chat",{
        chatUsers:users,
        name:_name,
    })
    .then(response => {
      return response.data;
    });
  }
}

export default new UserService();