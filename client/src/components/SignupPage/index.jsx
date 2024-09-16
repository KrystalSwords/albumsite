import { useState } from "react";
import { signupUser } from "../../api";

//COMPONENT that displays the main signup stuff
export default function SignupPage() {
    const [ user, setUser ] = useState(null);
    const [ pass, setPass ] = useState(null);
    const [ passcheck, setPasscheck ] = useState(null);
    const onUsernameChange = e => setUser(e.target.value);
    const onPasswordChange = e => setPass(e.target.value);
    const onPasscheckChange = e => setPasscheck(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();
        if(pass != passcheck) {
            console.log('passwords do not match');
            return;
        }
        signupUser({ user, pass }).then(response => console.log(response));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p>Please enter your Username</p>
                <input type="text" name="user" onChange={onUsernameChange} />
            </label>
            <label>
                <p>Please enter a Password</p>
                <input type="password" name="pass" onChange={onPasswordChange} />
            </label>
            <label>
                <p>Please re-enter your password for confirmation</p>
                <input type="password" name="passcheck" onChange={onPasscheckChange} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}