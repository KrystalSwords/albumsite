import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";

//COMPONENT that houses the entire login screen
export default function LoginPage({ token, setToken }) {
    const [ user, setUser ] = useState(null);
    const [ pass, setPass ] = useState(null);
    const navigate = useNavigate();
    const onUsernameChange = e => {
        setUser(e.target.value);
    }
    const onPasswordChange = e => {
        setPass(e.target.value);
    }

    useEffect(() => {
        if(token) {
            return navigate('/')
        }
    }, [token])
    

    const onLoginSubmit = async e => {
        e.preventDefault();
        loginUser({ user, pass }).then(data => setToken(data))
    }

    return (
        <form>
            <label>
                <p>Username</p>
                <input type="text" name="user" onChange={onUsernameChange} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" name="pass" onChange={onPasswordChange} />
            </label>
            <div>
                <button onClick={onLoginSubmit} >Submit</button>
            </div>
        </form>
    )
}