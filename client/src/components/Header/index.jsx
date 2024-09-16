import { Link } from "react-router-dom";
import "./styles.css";

//COMPONENT that contains a header for switching between features
export default function Header({ token }) {

    return (
        <div className="header">
            <Link to="/" className="headerItem">Home</Link>
            <Link to="/artists" className="headerItem">Artist List</Link>
            <Link to="/random" className="headerItem">Random Album</Link>
            <Link to="/Upload" className={token ? "headerItem" : "headerItemHide"}>Add An Album</Link>
            <Link to="/stats" className="headerItem">Stats</Link>
            <Link to="/login" className={token ? "headerItemHide" : "headerItem"}>Login</Link>
            {/*<Link to="/signup" className={token ? "headerItemHide" : "headerItem"}>Signup</Link>*/}
        </div>
    )
}