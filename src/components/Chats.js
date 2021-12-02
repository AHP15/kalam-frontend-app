import { selectChats, SET_SELECTED_CHAT} from '../slices/chat.slice.js';
import { useSelector, useDispatch } from 'react-redux';
import "../styles/Sidebar.css";
import Skeleton from "./Skeleton.js";

function Chats(){
    const chats = useSelector(selectChats);
    
    return (
        <div className="chat_contents">
            {chats === null && <Skeleton large={false} />}
            {
                chats?.map(chat => (
                    <ChatContainer key={chat.id} id={chat.id} name={chat.name} />
                ))
            }
        </div>
    );
}


function ChatContainer({id, name}){

    const dispatch = useDispatch();

    function handleClick(){
        dispatch(SET_SELECTED_CHAT({
            id,
            name,
        }));
    }

    return (
        <div onClick={handleClick} className="chat">
            <h3>{name}</h3>
        </div>
    );
}

export default Chats;