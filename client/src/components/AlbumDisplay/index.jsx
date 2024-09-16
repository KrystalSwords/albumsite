import { useState } from "react";
import UploadForm from "../UploadForm";
import { Button } from "@mui/joy";

//COMPONENT that displays an album given the info
export default function AlbumDisplay({ albumInfo, onEditSubmit, isEditing, setIsEditing, onDeleteSubmit, token }) {

    if(!albumInfo) {
        return <div>
            <h2>That album does not exist.</h2>
        </div>
    }

    return (
        <div>
            {token && <Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>}
            {token && <Button onClick={() => onDeleteSubmit(albumInfo.id)} >Delete</Button>}
            {!isEditing && <div>
                <h2>{albumInfo.Album}</h2>
                Artist: {albumInfo.Artist}<br />
                Release Year: {albumInfo.Year}<br />
                Genre Tags: {genreLister(albumInfo.Genre1, albumInfo.Genre2, albumInfo.Genre3)}<br />
                {specialDisplay(albumInfo.Special)}
            </div>}
            {isEditing && <UploadForm albumInfo={albumInfo} handleUploadSubmit={onEditSubmit} />}
        </div>
            
    )
}

function genreLister(genre1, genre2, genre3) {
    let genreList = genre1;
    if(genre2 != '') {
        genreList = genreList + ", " + genre2;
    }
    if(genre3 != '') {
        genreList = genreList + ", " + genre3;
    }
    return genreList;
}

function specialDisplay(special) {
    if(special === '*') {
        return "-< SPECIAL ALBUM >-";
    } else {
        return;
    }
}