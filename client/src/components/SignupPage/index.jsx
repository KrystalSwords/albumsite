async function signupUser(credentials) {
    return fetch('http://localhost:3002/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

//COMPONENT that displays the main signup stuff
export default function SignupPage() {

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        if(formJson.pass != formJson.passcheck) {
            console.log('passwords do not match');
            return;
        }
        const signupResponse = signupUser(formJson);
        console.log(signupResponse);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p>Please enter your Username</p>
                <input type="text" name="user" />
            </label>
            <label>
                <p>Please enter a Password</p>
                <input type="password" name="pass" />
            </label>
            <label>
                <p>Please re-enter your password for confirmation</p>
                <input type="password" name="passcheck" />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}