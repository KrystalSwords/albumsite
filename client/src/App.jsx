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

  const onRandomSubmit = (genre, special) => {
    event.preventDefault();
    fetchRandomAlbum(genre, special).then(album => setRandomAlbum(album))
  }

    const onEditSubmit = (albumInfo) => {
      setIsEditing(false);
      fetchEditAlbum(albumInfo).then(console.log("edited album " + albumInfo.id))
    }

    const onDeleteSubmit = (albumId) => {
      setOpenModal(false);
      fetchDeleteAlbum(albumId).then(console.log("deleted album " + albumId))
    }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout token={token} />}>
          <Route index element={<Home />} />
          <Route path="random" element={<RandomPage onRandomSubmit={onRandomSubmit} albumInfo={randomAlbum} />} />
          <Route path="artists" element={<ArtistList onEditSubmit={onEditSubmit} isEditing={isEditing} setIsEditing={setIsEditing} onDeleteSubmit={onDeleteSubmit} openModal={openModal} setOpenModal={setOpenModal} token={token} />} />
          <Route path="upload" element={<UploadPage token={token} />} />
          <Route path="login" element={<LoginPage token={token} setToken={setToken} />} />
          {/*<Route path='signup' element={<SignupPage />} />*/}
          <Route path="stats" element={<StatsPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App