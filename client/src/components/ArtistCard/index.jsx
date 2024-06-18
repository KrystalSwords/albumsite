import "./styles.css"; 

//COMPONENT that displays an artist and the albums they have made
export default function ArtistCard({ artist, albums }) {
    return (
        <div className="artistcard">
            <h2>{artist}</h2>
            <ul className="albumlist">
                {albums.map((item) => 
                    <li className="albumlistitem">{item.Album}</li>
                )}
            </ul>
        </div>
    )
}