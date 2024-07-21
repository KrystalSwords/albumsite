import { useEffect, useState } from 'react'
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import RandomPage from './components/RandomPage';
import Layout from './components/Layout';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import ArtistList from './components/ArtistList';
import UploadPage from './components/UploadPage';
import { useQuery, QueryClient } from '@tanstack/react-query';
import useToken from './hooks/useToken/useToken';
import SignupPage from './components/SignupPage';
import StatsPage from './components/StatsPage';
import LoginPage from './components/LoginPage';
import { Button } from '@mui/joy';
import './App.css';

function App() {
  const [ randomFetch, setRandomFetch ] = useState(false);
  const [ randomQuery, setRandomQuery ] = useState(null);
  const [ randomAlbumJson, setRandomAlbumJson ] = useState(null);
  const [ uploadFetch, setUploadFetch ] = useState(false);
  const [ albumToAdd, setAlbumToAdd ] = useState(null);
  const [ editFetch, setEditFetch ] = useState(false);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ deleteFetch, setDeleteFetch ] = useState(false);
  const [ currentId, setCurrentId ] = useState(null);
  const [ openModal, setOpenModal ] = useState(false);
  const { token, setToken } = useToken();
  //const navigate = useNavigate();

  //album recommendation submit
  const randomSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setRandomQuery(formJson);
      
    setRandomFetch(true);
  }

  function getQueryData(query) {
    let queryData = "";
    if(query.special === 'on') {
      queryData = queryData + `?special=${query.special}`;
    }
    return queryData;
  }

  useEffect(() => {
    if(randomFetch) {
      const queryURL = 'http://localhost:3002/api/get/random' + getQueryData(randomQuery);
      fetch(queryURL)
        .then((response) => response.json())
        .then(data => setRandomAlbumJson(data))
        .catch(error => console.error(error));
    }
    return () => setRandomFetch(false);
  })

  //upload an album submit
  const uploadSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setAlbumToAdd(formJson);
    setUploadFetch(true);
  }

    //edit an album submit
    const editSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      setAlbumToAdd(formJson);
      setIsEditing(false);
      setEditFetch(true);
    }
  
    useEffect(() => {
      if(editFetch) {
        fetch('http://localhost:3002/api/post/edit/' + albumToAdd.id, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(albumToAdd)
        })
      .then((res) => {
        console.log("success hopefully");
        setEditFetch(false);
        return res.json();
      })
      .catch(error => console.error(error))
    }})

    //delete an album submit 
    const deleteSubmit = (albumId) => {
      setCurrentId(albumId); 
      setDeleteFetch(true);
      setOpenModal(false);
      console.log("deleting album" + albumId)
    }
  
    useEffect(() => {
      if(deleteFetch) {
        fetch('http://localhost:3002/api/delete/' + currentId, { method: 'DELETE' })
      .then((res) => {
        console.log("success hopefully");
        return res.json();
      })
      .catch(error => console.error(error))}
      return () => setDeleteFetch(false);
    })

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout token={token} />}>
          <Route index element={<Home />} />
          <Route path="random" element={<RandomPage randomSubmit={randomSubmit} randomAlbumJson={randomAlbumJson} />} />
          <Route path="artists" element={<ArtistList editSubmit={editSubmit} isEditing={isEditing} setIsEditing={setIsEditing} deleteSubmit={deleteSubmit} openModal={openModal} setOpenModal={setOpenModal} token={token} />} />
          <Route path="upload" element={<UploadPage handleUploadSubmit={uploadSubmit} token={token} setToken={setToken} uploadQuery={uploadQuery} albumToAdd={albumToAdd} uploadFetch={uploadFetch} setUploadFetch={setUploadFetch} />} />
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

function uploadQuery(albumToAdd, uploadFetch, setUploadFetch) {
  const { isPending, isError, data, error } = useQuery({
      queryKey: ['albumupload'],
      queryFn: async () => {
          const response = await fetch('http://localhost:3002/api/post/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(albumToAdd)
          })
          if(!response.ok) {
              throw new Error('upload query failed')
          }
          console.log("success hopefully");
          return response.json()
      },
      enabled: uploadFetch,
      refetchOnWindowFocus: false,
      refetchOnMount: false
      
  })
  if (isPending) {
      return <span>Loading...</span>
  }
  if (isError) {
      return <span>Error: {error.message}</span>
  }
  return (
      <div>
          <h2>Successfully Uploaded Album!</h2>
          <button onClick={() => setUploadFetch(false)} className='button'>Add Another</button>
      </div>

  )
}

export default App