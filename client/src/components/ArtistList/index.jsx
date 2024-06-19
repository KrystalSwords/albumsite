import ArtistDisplay from "../ArtistDisplay";
import { useQuery } from '@tanstack/react-query';

//COMPONENT that displays the list of artists 
export default function ArtistList({ artistSubmit, artistListJson }) {

    return (
        <div>
            {listQuery()}
        </div>
        
    )
}

function listQuery() {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['artistlist'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3002/api/get/artists');
            console.log(response);
            if(!response.ok) {
                throw new Error('list query failed')
            }
            return response.json()
        }
    })
    console.log(data);
    if (isPending) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }
    
    return (
        <ArtistDisplay artistList={artistSort(data)} />
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
        artistalbumset.push({ Artist: artist, Albums: artistlist.filter((album) => album.Artist == artist) })
    })
    artistalbumset.sort((a, b) => a.Artist.charAt(0).localeCompare(b.Artist.charAt(0)))
    console.log(artistalbumset);
    return artistalbumset;
}