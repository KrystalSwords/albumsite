import { useState, useEffect } from "react";
import ArtistDisplay from "../ArtistDisplay";
import { useQuery } from '@tanstack/react-query';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import AlbumDisplay from "../AlbumDisplay";

//COMPONENT that displays the list of artists 
export default function ArtistList() {
    const [open, setOpen] = useState(false);
    const [albumData, setAlbumData] = useState([{ id: -1, Artist: "Default", Album: "Title", Year: 0, Special: '', Genre1: 'nullgenre'}]);
    const [albumDataSearch, setAlbumDataSearch] = useState(null);
    const handleOpen = (id) => {
        setOpen(true);
        setAlbumDataSearch(id)
    }

    useEffect(() => {
        if(albumDataSearch != null) {
            const queryURL = 'http://localhost:3002/api/get/album/' + albumDataSearch;
            fetch(queryURL)
                .then((response) => response.json())
                .then(data => setAlbumData(data))
                .catch(error => console.error(error));
        }
        console.log(albumData);
        return () => setAlbumDataSearch(null);
      })


    return (
        <div>
            {listQuery(handleOpen)}
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        <AlbumDisplay albumInfo={albumData[0]} />
                    </Typography>
                </Sheet>
            </Modal>
        </div>
        
    )
}

function listQuery(handleOpen) {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['artistlist'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3002/api/get/artists');
            if(!response.ok) {
                throw new Error('list query failed')
            }
            return response.json()
        },
        refetchOnMount: true
    })
    if (isPending) {
        return <span>Loading...</span>
    }
    if (isError) {
        return <span>Error: {error.message}</span>
    }
    return (
            <ArtistDisplay artistList={artistSort(data)} handleOpen={handleOpen} /> 
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
    return artistalbumset;
}