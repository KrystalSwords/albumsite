import { useState } from "react";

//HOOK that holds the logic for storing a token in state
export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    }

    const [ token, setToken ] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    }

    return {
        setToken: saveToken,
        token
    }
}