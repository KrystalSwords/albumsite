import ArtistCard from "../ArtistCard"
import "./styles.css";

//COMPONENT that takes in the artist list and displays it.
export default function ArtistDisplay({ artistList, handleOpen }) {
    return (
        <div>
            <ul className="artistdisplay">
                {artistList.map((item) => 
                    <li key={item.Artist}>
                        <ArtistCard artist={item.Artist} albums={item.Albums} handleOpen={handleOpen} />
                    </li>
                )}
            </ul>
        </div>

    )
}