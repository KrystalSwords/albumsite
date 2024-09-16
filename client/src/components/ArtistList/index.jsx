import { useState, useEffect } from "react";
import ArtistDisplay from "../ArtistDisplay";
import { useQuery } from '@tanstack/react-query';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import AlbumDisplay from "../AlbumDisplay";
import { fetchAlbum, fetchArtistList } from "../../api";

//COMPONENT that displays the list of artists 
export default function ArtistList({ onEditSubmit, isEditing, setIsEditing, onDeleteSubmit, openModal, setOpenModal, token }) {
    const [albumData, setAlbumData] = useState([{ id: -1, Artist: "Default", Album: "Title", Year: 0, Special: '', Genre1: 'nullgenre'}]);
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['artistlist'],
        queryFn: fetchArtistList,
        refetchOnMount: true
    })
    const handleOpen = (id) => {
        fetchAlbum(id).then(data => setAlbumData(data));
        setOpenModal(true);
    }
    const handleClose = () => {
        setOpenModal(false);
        setIsEditing(false);
    }

    return (
        <div>
            {isPending && <span>Loading...</span>}
            {isError && <span>Error: {error.message}</span>}
            {data && <ArtistDisplay artistList={artistSort(data)} handleOpen={handleOpen} />}
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openModal}
                onClose={handleClose}
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
                        <AlbumDisplay albumInfo={albumData[0]} onEditSubmit={onEditSubmit} isEditing={isEditing} setIsEditing={setIsEditing} onDeleteSubmit={onDeleteSubmit} token={token} />
                    </Typography>
                </Sheet>
            </Modal>
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
        artistalbumset.push({ Artist: artist, Albums: artistlist.filter((album) => album.Artist == artist) })
    })
    artistalbumset.sort((a, b) => a.Artist.charAt(0).localeCompare(b.Artist.charAt(0)))
    return artistalbumset;
}