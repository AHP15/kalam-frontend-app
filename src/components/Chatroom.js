import { useDispatch, useSelector } from "react-redux";
import { 
    SET_SELECTED_CHAT
    , selectCurrentChat
} from "../slices/chat.slice.js";
import "../styles/chatroom.css";
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import chatService from "../services/chat.service.js";
import Skeleton from "./Skeleton.js";
import { selectUser } from "../slices/user.slice.js";
import { io } from "socket.io-client";
import tokenService from "../services/token.service.js";
import Message from "./Message.js";

const socket = io("https://kalam-socket.herokuapp.com/", {
    auth: {
        token: tokenService.getLocalAccessToken(),
    }
});

socket.on("connect", () => {
    console.log(socket.id);
});


function Chatroom(){

    const dispatch = useDispatch();
    const currentChat =  useSelector(selectCurrentChat);
    const user = useSelector(selectUser);
    const [fullChat, setFullChat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const chatRef = useRef();


    useEffect(() => {
        if(currentChat){
            chatService.getChat(currentChat.id)
            .then(data => {
                setFullChat(data.message);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
            socket.emit("join_room", currentChat.id);

            socket.on("server_msg", arg => {
                setFullChat(prevState => {
                    return [
                      ...prevState,
                      {...arg}
                   ];
                });

                chatRef.current.scrollIntoView({smooth :true});
            });

            chatRef.current.scrollIntoView({smooth :true});
        }
    }, [currentChat]);

    function handleSubmit(e){
        e.preventDefault();

        if(content !== ""){
            chatService.addMessage(content, user.id, currentChat.id)
            .then(data => {
                let message = data.message;
                socket.emit("message", {
                    id:message._id,
                    content:message.content,
                    user:user.username
                }, currentChat.id);

                setContent("");
            })
            .catch(err => {
               console.log(err);
               setContent("");
            });
        }
    }

    function handleClose(){
        dispatch(SET_SELECTED_CHAT(false));
        socket.close();
    }


    return (
        <div className="chatroom">
            <div className="close_icon">
            <IconButton color="inherit" onClick={handleClose} >
              <CloseIcon color="inherit" fontSize='large' />
            </IconButton>
            </div>

            <div className="chatroom_info">
                <h2>{currentChat?.name}</h2>
            </div>
            <div className="chatroom_msg">
                {
                    loading
                    ? <Skeleton large={true} />
                    :fullChat && fullChat?.map(message => (
                        <Message key={message.id} message={message} />
                    ))
                }
                <div ref={chatRef} className="end_of_mesg"></div>
            </div>
            <div className="chatroom_form">
                <form onSubmit={handleSubmit}>
                    <input
                       type="text"
                       value={content}
                       onChange={(e) => setContent(e.target.value)}
                       required/>
                    <Button className="btn" type="submit" variant="outlined">Send</Button>
                </form>
            </div>
        </div>
    );
}

export default Chatroom;