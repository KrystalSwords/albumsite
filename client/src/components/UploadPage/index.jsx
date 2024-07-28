import { useNavigate } from "react-router-dom";
import UploadForm from "../UploadForm";
import "./styles.css";
import { useEffect } from "react";

//COMPONENT that houses all upload pieces   // <--- you dont really need these comments - a file's role should be obvious from how it's named, structured, and where it is in the folder structure
// Comment where something needs extra explanation
// And this is often a sign you can restructure/simplify/rename stuff for clarity
export default function UploadPage({ handleUploadSubmit, token, setToken, uploadQuery, albumToAdd, uploadFetch, setUploadFetch }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
            return navigate('/login')
        }
    }, [token])

    return (
        <div>
            <h2>Add an Album</h2>
            {!uploadFetch && <UploadForm handleUploadSubmit={handleUploadSubmit} />}
            <div style={{ visibility: uploadFetch ? 'visible' : 'hidden' }}>{uploadQuery(albumToAdd, uploadFetch, setUploadFetch)}</div>
        </div>
    )
}
