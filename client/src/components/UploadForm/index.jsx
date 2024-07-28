import { useState } from "react";
import "./styles.css";

//COMPONENT that comprises the upload form
export default function UploadForm ({ handleUploadSubmit, albumInfo }) {
    return (
        <div className="uploadform">
            <form onSubmit={handleUploadSubmit}>
                <section>
                    <div style={{ visibility: 'hidden' }} >
                        <label>id</label><input defaultValue={albumInfo ? albumInfo.id : ""} name="id" />
                    </div>
                </section>
                <section>
                    <div className="formdivmain">
                        <label>Artist</label><input defaultValue={albumInfo ? albumInfo.Artist : ""} name="Artist" />
                    </div>
                    <div className="formdivmain">
                        <label>Album</label><input defaultValue={albumInfo ? albumInfo.Album : ""} name="Album" />
                    </div>
                    <br />
                </section>
                <section className="secdiv">
                    <div className="formdiv">
                        <label>Genre 1</label><input defaultValue={albumInfo ? albumInfo.Genre1 : ""} name="Genre1" />
                    </div>
                    <div className="formdiv">
                        <label>Genre 2</label><input defaultValue={albumInfo ? albumInfo.Genre2 : ""} name="Genre2" />
                    </div>
                    <div className="formdiv">
                        <label>Genre 3</label><input defaultValue={albumInfo ? albumInfo.Genre3 : ""} name="Genre3" />
                    </div>
                </section>
                <section className="secdiv">
                    <div className="formdiv">
                        <label>Year</label><input defaultValue={albumInfo ? albumInfo.Year : 2000} type="number" name="Year" />
                    </div>
                    <div className="formdivspec">
                        <label>Special?</label><input defaultChecked={getSpecial(albumInfo)} type="checkbox" name="Special" />
                    </div>
                    <div className="formdivspacer"></div>
                </section>
                <div className="subdiv">
                    <input type="submit" className="uploadsubmit" />
                </div>
                
            </form>
            
        </div>
    )
}

// do this in your backend or ideally in the DB itself (convert to boolean column)
function getSpecial(albumInfo) {
    if(albumInfo) {
        return albumInfo.Special === "*" ? true : false;
    } else {
        return false;
    }
}
