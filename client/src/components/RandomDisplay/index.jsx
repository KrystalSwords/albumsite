import { useState } from "react";
import "./styles.css";

//COMPONENT that displays the random album selected
export default function RandomDisplay({ albumJson }) {
    console.log(albumJson);
    return (
        <div className="albumdisplay">
            <h1>{getArtist(albumJson)} - {getAlbum(albumJson)}</h1>
            <h2>Genres:</h2>
            <ul className="genrelist">
                {getGenrelist(albumJson).map((item) =>
                    <li className="listitem">{item}</li>
                )}
            </ul>
        </div>
    )
}

function getAlbum(albumJson) {
    if(albumJson === null) {
      return "Music awaits you!";
    } else {
      return albumJson[0].Album;
    }
  }
  
  function getArtist(albumJson) {
    if(albumJson === null) {
      return "Hit the button";
    } else {
      return albumJson[0].Artist;
    }
  }

function getGenrelist(albumJson) {
    if(albumJson === null) {
        return [];
    } else {
        let genrelist = [albumJson[0].Genre1];
        if(albumJson[0].Genre2 != "") {
            genrelist.push(albumJson[0].Genre2)
        }
        if(albumJson[0].Genre3 != "") {
            genrelist.push(albumJson[0].Genre3)
        }
        return genrelist;
    }

}