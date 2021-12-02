import "../styles/Dashboard.css";
import { selectUser, LOGOUT } from "../slices/user.slice.js";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar.js";
import Chatroom from "./Chatroom.js";
import { useEffect, useState} from "react";
import userService from "../services/user.service.js";
import { selectCurrentChat, SET_CHATS } from "../slices/chat.slice.js";
import { SET_CONTACTS } from "../slices/contact.slice.js";

function Dashboard(){

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    let currentChat = useSelector(selectCurrentChat);
    const [width , setWidth] = useState(window.innerWidth);

    useEffect(() =>{
        const handleResize = () =>{
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize",handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    });

    useEffect(() => {

        userService.getUserBoard()
        .then(data => {
            dispatch(SET_CHATS(data.chats));
            dispatch(SET_CONTACTS(data.contacts));
        })
        .catch(err => {
            console.log(err);
        });
    });

    return (
        <div className="dashboard">
            <header className="dashboard_header">
                <h1 onClick={() => window.location.reload()}>Kalam</h1>
                <div>
                    <p>Hello, {user.username}</p>
                    <p className="logout" onClick={() => dispatch(LOGOUT())}>logOut</p>
                </div>
            </header>
            <section>
                <div style={{ 
                    flex :`${!currentChat || width > 600? "1":"0"}`
                    , overflow:"hidden",
                    transition:"0.3s"
                }}>
                   <Sidebar />
                </div>
                <div style={{ 
                    flex :`${currentChat? "1":"0"}`, overflow:"hidden",transition:"0.3s"
                }} className="dashboard_room">
                   {currentChat && <Chatroom />}
                </div>
            </section>
        </div>
    );
}

export default Dashboard;