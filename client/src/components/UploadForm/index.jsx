import { useState } from "react";
import "./styles.css";

//COMPONENT that comprises the upload form
export default function UploadForm ({ handleUploadSubmit, albumInfo }) {
    const [ formResponses, setFormResponses ] = useState(albumInfo ? albumInfo : { id: -1, Artist: "", Album: "", Genre1: "", Genre2: "", Genre3: "", Year: 2000, Special: ""})
    const onIdChange = e => {
        setFormResponses((formResponses) => ({ ...formResponses, id: e.target.value }))
    }
    const onArtistChange = e => {
        setFormResponses((formResponses) => ({ ...formResponses, Artist: e.target.value }))
    }
    const onAlbumChange = e => {
        setFormResponses((formResponses) => ({ ...formResponses, Album: e.target.value }))
    }
    const onGenre1Change = e => {
        setFormResponses((formResponses) => ({ ...formResponses, Genre1: e.target.value }))
    }
    const onGenre2Change = e => {
        setFormResponses((formResponses) => ({ ...formResponses, Genre2: e.target.value }))
    }
    const onGenre3Change = e => {
        setFormResponses((formResponses) => ({ ...formResponses, Genre3: e.target.value }))
    }
    const onYearChange = e => {
        setFormResponses((formResponses) => ({ ...formResponses, Year: e.target.value }))
    }
    const onSpecialChange = e => {
        setFormResponses((formResponses) => ({ ...formResponses, Special: !formResponses.Special }))
    }

    return (
        <div className="uploadform">
            <form>
                <section>
                    <div style={{ visibility: 'hidden' }} >
                        <label>id</label><input value={albumInfo ? albumInfo.id : -1} onChange={onIdChange} name="id" />
                    </div>
                </section>
                <section>
                    <div className="formdivmain">
                        <label>Artist</label><input value={formResponses.Artist} onChange={onArtistChange} name="Artist" />
                    </div>
                    <div className="formdivmain">
                        <label>Album</label><input value={formResponses.Album} onChange={onAlbumChange} name="Album" />
                    </div>
                    <br />
                </section>
                <section className="secdiv">
                    <div className="formdiv">
                        <label>Genre 1</label><input value={formResponses.Genre1} onChange={onGenre1Change} name="Genre1" />
                    </div>
                    <div className="formdiv">
                        <label>Genre 2</label><input value={formResponses.Genre2} onChange={onGenre2Change} name="Genre2" />
                    </div>
                    <div className="formdiv">
                        <label>Genre 3</label><input value={formResponses.Genre3} onChange={onGenre3Change} name="Genre3" />
                    </div>
                </section>
                <section className="secdiv">
                    <div className="formdiv">
                        <label>Year</label><input value={formResponses.Year} onChange={onYearChange} type="number" name="Year" />
                    </div>
                    <div className="formdivspec">
                        <label>Special?</label><input checked={formResponses.Special} onChange={onSpecialChange} type="checkbox" name="Special" />
                    </div>
                    <div className="formdivspacer"></div>
                </section>
                <div className="subdiv">
                    <button className="uploadsubmit" onClick={() => handleUploadSubmit(formResponses)} >Submit</button>
                </div>
                
            </form>
            
        </div>
    )
}

function getSpecial(albumInfo) {
    if(albumInfo) {
        return albumInfo.Special === "*" ? true : false;
    } else {
        return false;
    }
}