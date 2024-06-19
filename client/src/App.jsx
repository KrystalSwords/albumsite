import { useEffect, useState } from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import RandomPage from './components/RandomPage';
import Layout from './components/Layout';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import ArtistList from './components/ArtistList';
import UploadPage from './components/UploadPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [randomFetch, setRandomFetch] = useState(false);
  const [randomQuery, setRandomQuery] = useState(null);
  const [randomAlbumJson, setRandomAlbumJson] = useState(null);
  const [artistFetch, setArtistFetch] = useState(false);
  const [artistListJson, setArtistListJson] = useState([]);
  const [uploadFetch, setUploadFetch] = useState(false);
  const [albumToAdd, setAlbumToAdd] = useState(null);
  
  //full list submit
  function artistSubmit() {
    setArtistFetch(true);
  }
  
  useEffect(() => {
    if(artistFetch) {
      fetch('http://localhost:3002/api/get/artists')
        .then((response) => response.json())
        .then(data => setArtistListJson(data))
        .catch(error => console.error(error));
    }
    return () => setArtistFetch(false);
  })

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

  useEffect(() => {
    if(uploadFetch) {
      fetch('http://localhost:3002/api/post/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(albumToAdd)
      })
    .then((res) => {
      console.log("success hopefully");
      setUploadFetch(false);
      return res.json();
    })
    .catch(error => console.error(error))
  }})

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="random" element={<RandomPage randomSubmit={randomSubmit} randomAlbumJson={randomAlbumJson} />} />
          <Route path="artists" element={
            <QueryClientProvider client={queryClient}>
              <ArtistList artistSubmit={artistSubmit} artistListJson={artistListJson} />
            </QueryClientProvider>
          } />
          <Route path="upload" element={<UploadPage handleUploadSubmit={uploadSubmit} />} />

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