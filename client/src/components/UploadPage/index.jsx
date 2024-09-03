import { useNavigate } from "react-router-dom";
import UploadForm from "../UploadForm";
import "./styles.css";
import { useEffect, useState } from "react";
import { uploadAlbum } from "../../api";
import { useQuery } from "@tanstack/react-query";

//COMPONENT that houses all upload pieces
export default function UploadPage({ token }) {
    const [ albumInfo, setAlbumInfo ] = useState(null)
    const navigate = useNavigate();
    const { isPending, isLoading, isError, data, error } = useQuery({
        queryKey: ['albumupload'],
        queryFn: () => uploadAlbum(albumInfo).then(response => console.log(response)),
        enabled: !!albumInfo
    })
    const handleUploadSubmit = (albumInfo) => {
        setAlbumInfo(albumInfo);
    }

    /*useEffect(() => {
        if(!token) {
            return navigate('/login')
        }
    }, [token])*/

    return (
        <div>
            <h2>Add an Album</h2>
            {isPending && <UploadForm handleUploadSubmit={handleUploadSubmit} />}
            {isLoading && <span>Loading...</span>}
            {isError && <span>Error: {error.message}</span>}
            {data && <div>
                        <h2>Successfully Uploaded Album!</h2>
                        <button onClick={() => setAlbumInfo(null)} className='button'>Add Another</button>
                    </div>}
        </div>
    )
}