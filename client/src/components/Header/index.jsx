import { Link } from "react-router-dom";
import "./styles.css";

//COMPONENT that contains a header for switching between features
export default function Header() {
    return (
        <div className="header">
            <Link to="/" className="headerItem">Home</Link>
            <Link to="/artists" className="headerItem">Artist List</Link>
            <Link to="/random" className="headerItem">Random Album</Link>
            <Link to="/Upload" className="headerItem">Add An Album</Link>
        </div>
    )
}