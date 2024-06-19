import { useState } from "react";
import AlbumList from "./AlbumList";
import "./styles.css"; 

//COMPONENT that displays an artist and the albums they have made
export default function ArtistCard({ artist, albums }) {
    return (
        <div className="artistcard" >
            <h2>{artist}</h2>
            <AlbumList albums={albums} className="albumlist" />
        </div>
    )
}
