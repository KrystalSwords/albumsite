export async function fetchRandomAlbum(genre, special) {
    let queryData = 'http://localhost:3002/api/get/random'
    if(special || genre !== "") {
        queryData = queryData + '?'
    }
    if(special) {
        queryData = queryData + `special=${special}`;
    }
    if(special && genre !== "") {
        queryData = queryData + '&'
    }
    if(genre !== "") {
        queryData = queryData + `genre=${genre}`;
    }
    try {
        const response = await fetch(queryData);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        return json;
      } catch (error) {
        console.error(error.message);
      }  
}

export async function fetchDeleteAlbum(id) {
    try {
        const response = await fetch('http://localhost:3002/api/delete/' + id, { method: 'DELETE' })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchEditAlbum(albumInfo) {
    try {
        const response = await fetch('http://localhost:3002/api/post/edit/' + albumInfo.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(albumInfo)
          })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchAlbum(id) {
    let queryData = 'http://localhost:3002/api/get/album/' + id;
    try {
        const response = await fetch(queryData);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }  
}

export async function fetchGenreList() {
    const response = await fetch('http://localhost:3002/api/get/genrelist');
    if(!response.ok) {
        throw new Error('list query failed')
    }
    return response.json()
}

export async function fetchArtistList() {
    const response = await fetch('http://localhost:3002/api/get/artists');
    if(!response.ok) {
        throw new Error('list query failed')
    }
    return response.json()
}

export async function uploadAlbum(albumInfo) {
    const response = await fetch('http://localhost:3002/api/post/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(albumInfo)
      })
      if(!response.ok) {
          throw new Error('upload query failed')
      }
      console.log("success hopefully");
      return response.json()
}