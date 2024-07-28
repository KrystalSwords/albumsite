import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


async function loginUser(credentials) { // move to api/user.js 
    return fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

//COMPONENT that houses the entire login screen
export default function LoginPage({ token, setToken }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(token) {
            return navigate('/')
        }
    }, [token])
    

    const handleSubmit = async e => { // use an HTML request library here and extract this to api/user.js - same pattern as App.jsx
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        const token = await loginUser(formJson);
        setToken(token);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" name="user" />
            </label>
            <label>
                <p>Password</p>
                <input type="password" name="pass" />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}
