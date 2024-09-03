import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import RandomPage from './components/RandomPage';
import Layout from './components/Layout';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import ArtistList from './components/ArtistList';
import UploadPage from './components/UploadPage';
import useToken from './hooks/useToken/useToken';
import SignupPage from './components/SignupPage';
import StatsPage from './components/StatsPage';
import LoginPage from './components/LoginPage';
import './App.css';
import { fetchDeleteAlbum, fetchEditAlbum, fetchRandomAlbum } from './api';

function App() {
  const [ randomAlbum, setRandomAlbum ] = useState(null);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ openModal, setOpenModal ] = useState(false);
  const { token, setToken } = useToken();
  //const navigate = useNavigate();

  //album recommendation submit
  const randomSubmit = (genre, special) => {
    event.preventDefault();
    fetchRandomAlbum(genre, special).then(album => setRandomAlbum(album))
  }

    //edit an album submit
    const editSubmit = (albumInfo) => {
      setIsEditing(false);
      fetchEditAlbum(albumInfo).then(console.log("edited album " + albumInfo.id))
    }

    //delete an album submit 
    const deleteSubmit = (albumId) => {
      setOpenModal(false);
      fetchDeleteAlbum(albumId).then(console.log("deleted album " + albumId))
    }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout token={token} />}>
          <Route index element={<Home />} />
          <Route path="random" element={<RandomPage randomSubmit={randomSubmit} randomAlbumJson={randomAlbum} />} />
          <Route path="artists" element={<ArtistList editSubmit={editSubmit} isEditing={isEditing} setIsEditing={setIsEditing} deleteSubmit={deleteSubmit} openModal={openModal} setOpenModal={setOpenModal} token={token} />} />
          <Route path="upload" element={<UploadPage token={token} />} />
          <Route path="login" element={<LoginPage token={token} setToken={setToken}/>} />
          <Route path='signup' element={<SignupPage />} />
          <Route path="stats" element={<StatsPage />} />

          {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App