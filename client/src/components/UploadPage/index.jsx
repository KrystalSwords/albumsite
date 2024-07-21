import { useNavigate } from "react-router-dom";
import UploadForm from "../UploadForm";
import "./styles.css";
import { useEffect } from "react";

//COMPONENT that houses all upload pieces
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