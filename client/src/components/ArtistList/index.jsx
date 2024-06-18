import { useState, useEffect } from "react";
import ArtistDisplay from "../ArtistDisplay";

//COMPONENT that displays the list of artists 
export default function ArtistList({ artistSubmit, artistListJson }) {

    return (
        <div>
            <button onClick={() => artistSubmit()}>Update List</button>
            <ArtistDisplay artistList={artistSort(artistListJson)} />
        </div>
        
    )
}

function artistSort(artistlist) {
    let uniqueartists = [];
    let artistalbumset = [];
    artistlist.forEach((album) => {
        if(uniqueartists.indexOf(album.Artist) > -1) {
        } else {
            uniqueartists.push(album.Artist);
        }
    })
    uniqueartists.forEach((artist) => {
        artistalbumset.push({ Artist: artist, Albums: artistlist.filter((album) => album.Artist == artist)})
    })
    console.log(artistalbumset);
    return artistalbumset;
}