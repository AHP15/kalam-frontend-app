import { useState } from "react";
import Login from "./Login.js";
import Register from "./Register.js";
import "../styles/Home.css";

function Home(){
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    return (
        <div className="home">
            {!login && !register &&
                <div className="home_info">
                    <h1>Welcome To Kalam</h1>
                    <h3>Best place where you can chat with your friends</h3>
                    <div>
                        <p onClick={() => setLogin(true)}>SignIn</p>
                        <p onClick={() =>setRegister(true)}>SignUp</p>
                    </div>
                </div>
            }
            
            { login && <Login hide={setLogin}/> }
            { register && <Register hide={setRegister} /> }
        </div>
    );
}

export default Home;