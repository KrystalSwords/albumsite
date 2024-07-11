//COMPONENT that displays an album given the info
export default function AlbumDisplay({ albumInfo }) {
    return (
        <div>
            <h2>{albumInfo.Album}</h2>
            Artist: {albumInfo.Artist}<br />
            Release Year: {albumInfo.Year}<br />
            Genre Tags: {genreLister(albumInfo.Genre1, albumInfo.Genre2, albumInfo.Genre3)}<br />
            {specialDisplay(albumInfo.Special)}
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
}

function specialDisplay(special) {
    if(special === '*') {
        return "-< SPECIAL ALBUM >-";
    } else {
        return;
    }
}