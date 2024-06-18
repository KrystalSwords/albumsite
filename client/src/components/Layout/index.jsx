import Header from "../Header";
import { Outlet } from "react-router-dom";
import "./styles.css";

//COMPONENT that houses the header and mainpage
export default function Layout() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}