import { useState } from "react";
import "../styles/Sidebar.css";
import Chats from "./Chats.js";
import Contacts from "./Contacts";
import ChatModel from "./ChatModel.js";
import ContactModel from "./ContactModel.js";
import { Button } from "@mui/material";

function Sidebar(){
    const [content, setContent] = useState("chats");
    const [openModel, setOpenModel] = useState(false);

    return (
        <div className="sidebar">
             <div className="sidebar_nav">
                <p 
                   onClick={() =>setContent("chats")} 
                   className={content === "chats" ? "sidebar_chats":""}
                >
                    Chats
                </p>
                <p 
                   onClick={() =>setContent("contacts")}
                   className={content === "contacts" ? "sidebar_contacts":""}
                >
                   Contacts
                </p>
            </div>

            <div className="sidebar_contents">
                {
                    content === "chats"
                    ?<Chats />
                    :<Contacts />
                }
            </div>
    
            <Button 
             variant="outlined" className="sidebar_btn" onClick={() => setOpenModel(true)}>
                {content === "chats"? "New Chat": "New Contact"}
                
            </Button>

            <div className={`sidebar_model ${openModel? "active":""}`}>
                <div className="model_close" onClick={() => setOpenModel(false)}></div>

                {
                    content === "chats"
                    ?<ChatModel closeModel={() =>setOpenModel(false)} />
                    :<ContactModel closeModel={() =>setOpenModel(false)} />
                }
            </div>
            <div className={openModel? "overlay":""}></div>
        </div>
    );
}

export default Sidebar;