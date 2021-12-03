import { useState } from "react";
import authService from "../services/auth.service.js";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import "../styles/form.style.css";
import { SET_USER } from '../slices/user.slice.js';
import { useDispatch } from 'react-redux';

function Login({hide}){
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [failMessage, setFailMessage ] = useState("");

    const dispatch = useDispatch();

    function handleInvalid(e){
        e.preventDefault();

        if(e.target.type === "email"){
            setEmailErr(true);
        }else{
            setPasswordErr(true);
        }
    }

    function handleChange(e){
        if(e.target.type === "email"){
            setEmail(e.target.value);
            setEmailErr(false);
        }else{
            setPassword(e.target.value);
            setPasswordErr(false);
        }

        setFailMessage("");
    }

    function handleSubmit(e){
        e.preventDefault();
        
        setFailMessage("");
        setLoading(true);
        authService.login(email, password)
        .then(data => {
            setEmail("");
            setPassword("");
            setLoading(false);
            dispatch(SET_USER(data));
            window.location.reload();
        })
        .catch(error => {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            
            setLoading(false);
            setFailMessage(message);
        });
    }
    
    return (
        <div className="login">
            <IconButton onClick={() =>hide(false)} className="back">
                <ArrowBackIcon />
            </IconButton>
            <h1>SignIn</h1>
           <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onInvalid={handleInvalid}
                  onChange={handleChange}
                  value={email}
                  required
                />
                <p className={`form_error ${emailErr && "active"}`}>
                    { emailErr && "Invalid email"}
                </p>
              </div>

              <div>
                <label htmlFor="password" >Password</label>
                <input
                   type="password"
                   minLength="8"
                   maxLength="40"
                   onInvalid={handleInvalid}
                   onChange={handleChange}
                   value={password}
                   required
                />
                <p className={`form_error ${passwordErr && "active"}`}>
                    { passwordErr && "password must be between 8 and 40 characters" }
                </p>
              </div>

              <Button
                type="submit"
                variant="outlined"
                disabled={loading}
              >
                Login
              </Button>
            </form>
            <div className={`fail_message ${failMessage && "active"}`}>
                {failMessage}
            </div>
        </div>
    );
}

export default Login;