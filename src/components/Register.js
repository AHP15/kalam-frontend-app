import "../styles/form.style.css";
import { useState } from "react";
import authService from "../services/auth.service.js";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";

function Register({hide}){
    const [usernameErr, setUsernameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage ] = useState({
        text:"",
        seccuss:null,
    });

    function handleInvalid(e){
        e.preventDefault();
       if(e.target.type === "text"){
           setUsernameErr(true);
       }else if(e.target.type === "email"){
            setEmailErr(true);
        }else{
            setPasswordErr(true);
        }
    }

    function handleChange(e){
        if(e.target.type === "text"){
            setUsername(e.target.value);
            setUsernameErr(false);
        }else if(e.target.type === "email"){
            setEmail(e.target.value);
            setEmailErr(false);
        }else{
            setPassword(e.target.value);
            setPasswordErr(false);
        }

        setMessage({
            text:"",
            seccuss:null,
        });
    }

    function handleSubmit(e){
        e.preventDefault();

        setMessage({
            text:"",
            seccuss:null,
        });
        setLoading(true);

        authService.register(username, email, password)
        .then(response => {
            setLoading(false);
            setUsername("");
            setEmail("");
            setPassword("");
            setMessage({
                text: response.data.message,
                seccuss: true,
            });
            console.log(message);
        })
        .catch(error => {
            const MSG = (
                error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            
            setLoading(false);
            setMessage({
                text:MSG,
                seccuss: false,
            });
        });
    }

    return (
        <div className="register">
            <IconButton onClick={() =>hide(false)} className="back">
                <ArrowBackIcon />
            </IconButton>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="text">Username</label>
                <input
                  type="text"
                  minLength="3"
                  maxLength="20"
                  onInvalid={handleInvalid}
                  value={username}
                  onChange={handleChange}
                  required
                />
                <p className={`form_error ${usernameErr && "active"}`}>
                    { usernameErr && "username must be between 3 and 20 characters"}
                </p>
              </div>
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
                Register
              </Button>
            </form>

            <div 
              className={
                  `${message.seccuss?"seccuss_msg":"fail_message"} ${message.text && "active"}`
                }
            >
                {message.text}
            </div>
        </div>
    );
}

export default Register;