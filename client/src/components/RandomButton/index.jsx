import "./styles.css";

//COMPONENT that contains the randomizer button and possible options
export default function RandomButton({ handleSubmit }) {
    return (
        // This needs local state controlling the checkboxt
        <div className="randomoptions">
            <form onSubmit={handleSubmit}> // onSubmit={()=>handleSubmit({ special, genre })} 
                <label className="randspecial">Special?</label><input type="checkbox" name="special" />
                <input type="submit" className="randsubmit" value="Recommend me an album!"/>
            </form>
        </div>
    )
}
