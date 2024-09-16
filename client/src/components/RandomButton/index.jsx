import { useQuery } from "@tanstack/react-query";
import "./styles.css";
import { useState } from "react";
import { fetchGenreList } from "../../api";

//COMPONENT that contains the randomizer button and possible options
export default function RandomButton({ onRandomSubmit }) {
    const [ genreSelect, setGenreSelect ] = useState(null);
    const [ specialSelect, setSpecialSelect ] = useState(false);
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['genrelist'],
        queryFn: fetchGenreList,
        refetchOnMount: true
    })
    const onGenreChange = e => {
        setGenreSelect(e.target.value);
    }
    const onSpecialChange = e => {
        setSpecialSelect(!specialSelect);
    }

    return (
        <div className="randomoptions">
            {isPending && <span>Loading...</span>}
            {isError && <span>Error: {error.message}</span>}
            {data && <form >
                        <label>Genre?</label>
                        <select name="genre" onChange={onGenreChange}>
                            <option value="">--CHOOSE A GENRE--</option>
                            {data.map((genre) => <option value={genre.Genre1}>{genre.Genre1}</option>)}
                        </select>
                        <label className="randspecial">Special?</label><input type="checkbox" name="special" onChange={onSpecialChange} />
                        <button className="randsubmit" onClick={() => onRandomSubmit(genreSelect, specialSelect)} >Recommend me an album!</button>
                    </form>}
        </div>
    )
}

