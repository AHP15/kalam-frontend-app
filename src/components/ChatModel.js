import { selectContacts } from "../slices/contact.slice.js";
import { ADD_CHAT } from "../slices/chat.slice.js";
import userService from "../services/user.service.js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import "../styles/ChatModel.css";

function ChatModel({closeModel}){
    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [chatName, setChatName]= useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleChange(_email){
        // if the client has been select a contact and want to removes it
        if(users.includes(_email)){
            setUsers(users => users.filter(email => email !== _email))
        }else{
            // else just add contact to 
            setUsers(users => [...users, _email])
        }

        console.log(users);
    }

    function onChageName(e){
        setChatName(e.target.value);
    }

    function handleInvalid(e){
        e.preventDefault();
        setMessage("Invalid chat name !!");
    }

    function handleSubmit(e){
        e.preventDefault();

        if(users.length === 0){
            setMessage("You must select at least one contact !!");
            return;
        };

        setLoading(true);
        userService.addChat(users, chatName)
        .then(data => {
            dispatch(ADD_CHAT({
                id:data.id,
                name: data.name
            }));
            setLoading(false);
            closeModel(true);
        })
        .catch(error => {
            const MSG = (
                error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            setMessage(MSG);
            setLoading(false);
        });
    }

    return (
        <div className="chat_model">
            <form onSubmit={handleSubmit}>
                <div className="chatName_input">
                    <label>Chat Name</label>
                    <input
                        type="text"
                        minLength="3"
                        value={chatName}
                        onChange={onChageName}
                        onInvalid={handleInvalid}
                        required
                    />
                </div>

                <div className="chat_contacts">
                {
                contacts?.map(
                    contact => (<div key={contact.id}>
                    <input
                        type="checkbox"
                        value={users.includes(contact.email)}
                        className="checkbox_input"
                        name={contact.email}
                        onChange={() =>handleChange(contact.email)}
                    />
                    <label htmlFor={contact.email}>{contact.email}</label>
                </div>))
                }
                </div>

                <Button
                className="model_btn"
                type="submit"
                variant="outlined"
                disabled={loading}>Add Chat</Button>
            </form>

            <div className={`error_message ${message && "active"}`}>{message}</div>
        </div>
    );
}


export default ChatModel;