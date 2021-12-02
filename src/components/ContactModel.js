import { useState } from "react";
import { Button } from "@mui/material";
import userService from "../services/user.service.js";
import { useDispatch } from "react-redux";
import { ADD_CONTACT } from "../slices/contact.slice.js";

function ContactModel(){

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    function onChageName(e){
        setEmail(e.target.value);
        setMessage("");
    }

    function handleInvalid(e){
        e.preventDefault();
        setMessage("Invalid Email !!");
    }

    function handleSubmit(e){
        e.preventDefault();
        
        setLoading(true);
        userService.addContact(email)
        .then(data => {
            setLoading(false);
            dispatch(ADD_CONTACT({
                id: data.id,
                username: data.username,
                email:data.email,
            }));
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
        <div className="contact_model" >
            <form onSubmit={handleSubmit}>
            <div className="contactModel_input">
                    <label>User Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={onChageName}
                        onInvalid={handleInvalid}
                        required
                    />
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

export default ContactModel;