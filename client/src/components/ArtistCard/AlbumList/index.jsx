import "./styles.css";

//COMPONENT that generates album list
export default function AlbumList({ albums, handleOpen }) {
    albums.sort((a, b) => {
        return (a.Year - b.Year);
    })
    return (
        <ul className="albumlist">
            {albums.map((item) => 
                <li onClick={() => handleOpen(item.id)} className="albumlistitem" key={item.Album}>{item.Album}</li>
            )}
        </ul>
    )
}
