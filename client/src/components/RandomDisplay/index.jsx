import { useState } from "react";
import "./styles.css";

//COMPONENT that displays the random album selected
export default function RandomDisplay({ albumInfo }) {
    console.log(albumInfo);
    return (
        <div className="albumdisplay">
            <h1>{getArtist(albumInfo)} - {getAlbum(albumInfo)}</h1>
            <h2>Genres:</h2>
            <ul className="genrelist">
                {getGenrelist(albumInfo).map((item) =>
                    <li className="listitem">{item}</li>
                )}
            </ul>
        </div>
    )
}

function getAlbum(albumInfo) {
    if(albumInfo === null) {
      return "Music awaits you!";
    } else {
      return albumInfo[0].Album;
    }
  }
  
  function getArtist(albumInfo) {
    if(albumInfo === null) {
      return "Hit the button";
    } else {
      return albumInfo[0].Artist;
    }
  }

function getGenrelist(albumInfo) {
    if(albumInfo === null) {
        return [];
    } else {
        let genrelist = [albumInfo[0].Genre1];
        if(albumInfo[0].Genre2 != "") {
            genrelist.push(albumInfo[0].Genre2)
        }
        if(albumInfo[0].Genre3 != "") {
            genrelist.push(albumInfo[0].Genre3)
        }
        return genrelist;
    }

}