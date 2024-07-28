import "./styles.css";

//COMPONENT that generates album list
export default function AlbumList({ albums, handleOpen }) {
    albums.sort((a, b) => {
        return (a.Year - b.Year);
    }) // This is a data level concern, it belongs wherever you're handling the list of albums
    return (
        <ul className="albumlist">
            {albums.map((item) => 
                <li onClick={() => handleOpen(item.id)} className="albumlistitem" key={item.Album}>{item.Album}</li>
            )}
        </ul>
    )
}
