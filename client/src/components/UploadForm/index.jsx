import "./styles.css";

//COMPONENT that comprises the upload form
export default function UploadForm ({ handleUploadSubmit }) {
    return (
        <div className="uploadform">
            <form onSubmit={handleUploadSubmit}>
                <section>
                    <div className="formdivmain">
                        <label>Artist</label><input name="Artist" />
                    </div>
                    <div className="formdivmain">
                        <label>Album</label><input name="Album" />
                    </div>
                    <br />
                </section>
                <section className="secdiv">
                    <div className="formdiv">
                        <label>Genre 1</label><input name="Genre1" />
                    </div>
                    <div className="formdiv">
                        <label>Genre 2</label><input name="Genre2" />
                    </div>
                    <div className="formdiv">
                        <label>Genre 3</label><input name="Genre3" />
                    </div>
                </section>
                <section className="secdiv">
                    <div className="formdiv">
                        <label>Year</label><input type="number" name="Year" />
                    </div>
                    <div className="formdivspec">
                        <label>Special?</label><input type="checkbox" name="Special" />
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