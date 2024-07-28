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
  const [ randomAlbumJson, setRandomAlbumJson ] = useState(null);  // this could just be called randomAlbum - everything's just an object and so is json
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
  const randomSubmit = ({ genre, special }) => {         // All click handling / form submission functions should be called onWhatever. this would be onRandomSubmit or onRandomClick etc
      // you probably want the lower level component to be controlled with its own internal state (if it doesnt need to be controlled higher up)
      // and then random submit would be called with a literal variable or an object representing the bits of form data
      // e.g.    someComponent = ({ onRandomClick, ... }) => {
      //            <button onClick={ onRandomClick({ genre, special })  // genre and special would be state variables controlling the form display and changing in response to user input
      //         }
                  
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setRandomQuery(formJson);    // We dont need this RandomQuery state variable at all - let's instead just make the html call and combine this function with the useEffect below
                                // but not in this file! over in /api
    setRandomFetch(true);
  }

  function getQueryData(query) {
    let queryData = "";
    if(query.special === 'on') {
      queryData = queryData + `?special=${query.special}`;/ // use a standard HTML request library to build queries- you wont need a whole separate function for this
    }
    return queryData;
  }

  useEffect(() => {
    if(randomFetch) { // dont need the if since we're getting rid of this variable

      // All api function calls should be extracted to a file or files in src/api
      // so in this file we'd just call
      // fetchRandomAlbum(genre, special)
      //     .then(data => setRandomAlbum(data))
      //     .catch(...)
      
      
      const queryURL = 'http://localhost:3002/api/get/random' + getQueryData(randomQuery);
      fetch(queryURL)
        .then((response) => response.json())
        .then(data => setRandomAlbumJson(data))
        .catch(error => console.error(error));
    }
    return () => setRandomFetch(false); // don't need this
  })

  //upload an album submit
  const uploadSubmit = (e) => { 
    // same story here: onUploadSubmit({ foo, bar, title, genre }) => uploadAlbum({ foo, bar, title, genre }).then(whateverHasToHappenInTheUi()).catch(whatever)
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setAlbumToAdd(formJson);
    setUploadFetch(true);
  }

    //edit an album submit
    const editSubmit = (e) => {
      // same pattern as above
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

          // ArtistListPage not ArtistList
          // Some of these states probably dont need to be managed this high up - could ArtistListPage import the api functions? 
          // You only need state coordination up here if the pages are affecting other pages
          // Manage state as low as possible to reduce complexity
          <Route path="artists" element={<ArtistList editSubmit isEditing setIsEditing deleteSubmit openModal setOpenModal token />} />

          // Use shorthand object property notation when the names match e.g. <Foo bar> instead of <Foo bar={bar}>. If the names dont match
            // maybe it makes sense to change them? Or sometimes not - sometimes the behavioral assumptions of a e.g callback function start to get more specific
            // the farther down into the component tree it goes.
            // here you could rename handleUploadSubmit={uploadSubmit} to onUploadSubmit (shorthand notation)
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

    // the below should all be replaced and the UI stuff handled separately from what the api is doing

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
