import RandomButton from '../RandomButton'
import RandomDisplay from '../RandomDisplay';
import "./styles.css";

//COMPONENT that houses the entire random album generator page
export default function RandomPage({ randomSubmit, randomAlbumJson }) {
    return (
        <div className='maindisplay'>
            <h1>The Album Recommender</h1>
            <RandomButton handleSubmit={randomSubmit} />
            <RandomDisplay albumJson={randomAlbumJson} />
        </div>
    )
}

