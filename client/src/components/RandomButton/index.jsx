import "./styles.css";

//COMPONENT that contains the randomizer button and possible options
export default function RandomButton({ handleSubmit }) {
    return (
        <div className="randomoptions">
            <form onSubmit={handleSubmit}>
                <label className="randspecial">Special?</label><input type="checkbox" name="special" />
                <input type="submit" className="randsubmit" value="Recommend me an album!"/>
            </form>
        </div>
    )
}