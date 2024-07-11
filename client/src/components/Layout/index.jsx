import Header from "../Header";
import { Outlet } from "react-router-dom";
import "./styles.css";

//COMPONENT that houses the header and mainpage
export default function Layout({ token }) {
    return (
        <div>
            <div>
                <Header token={token} />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}