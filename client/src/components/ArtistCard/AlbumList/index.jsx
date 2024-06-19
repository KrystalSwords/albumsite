import "./styles.css";

//COMPONENT that generates album list
export default function AlbumList({ albums }) {
    albums.sort((a, b) => {
        return (a.Year - b.Year);
    })
    return (
        <ul className="albumlist">
            {albums.map((item) => 
                <li className="albumlistitem">{item.Album}</li>
            )}
        </ul>
    )
}
