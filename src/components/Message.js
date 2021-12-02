import { useSelector } from "react-redux";
import { selectUser } from "../slices/user.slice.js";
import "../styles/Message.css";

function Message({message}) {
    const user = useSelector(selectUser);
    const from_me = message.user === user.username;

    return (
        <div className={`message ${from_me && "from_me"}`}>
            <div className="message_content">
               <p className={`message_user ${!from_me && "other"}`}>{message.user}</p>
                <p>{message.content}</p>
            </div>
        </div>
    );
}

export default Message;