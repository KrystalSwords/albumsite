import { useState } from "react";
import UploadForm from "../UploadForm";
import { Button } from "@mui/joy";

//COMPONENT that displays an album given the info
export default function AlbumDisplay({ albumInfo, editSubmit, isEditing, setIsEditing, deleteSubmit, token }) {

    if(!albumInfo) {
        return <div>
            <h2>That album does not exist.</h2>
        </div>
    }

    // isEditing feels like a UI concern - that probably belongs in a lower component than App.jsx - it probably belongs wherever the top of the modal is

    // prop deleteSubmit should probably be called onAlbumDeleteClick 

    return (
        <div>
            {token && <Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>} // should probably call "token" "isLoggedIn" or "currentUserToken" or something
            {token && <Button onClick={() => deleteSubmit(albumInfo.id)} >Delete</Button>}
            {!isEditing && <div>
                <h2>{albumInfo.Album}</h2>
                Artist: {albumInfo.Artist}<br />
                Release Year: {albumInfo.Year}<br />
                Genre Tags: {genreLister(albumInfo.Genre1, albumInfo.Genre2, albumInfo.Genre3)}<br /> // Variable names with numbers in them are an indication you should be using an array instead
                {specialDisplay(albumInfo.Special)}
            </div>}

            // onSubmitClick (or onUploadSubmitClick  ={onEditSubmit}
            {isEditing && <UploadForm albumInfo={albumInfo} handleUploadSubmit={editSubmit} />}
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

    // probably more like genreList=(...genres) {
    //   return genres.filter(n => n).join(', ');
    // }
    // and then this might be simple enough to inline in the html
}

function specialDisplay(special) {
    if(special === '*') { // arcane symbol - should this a be constant? if this represents "is special" or "is not special" translate this to a boolean somewhere as close to the data layer as possible.
                          // probably over in server not client
        return "-< SPECIAL ALBUM >-";
    } else { // unneeded
        return;
    }
}
