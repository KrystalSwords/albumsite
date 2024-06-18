import UploadForm from "../UploadForm";
import "./styles.css";

//COMPONENT that houses all upload pieces
export default function UploadPage({ handleUploadSubmit }) {
    return (
        <div>
            <h2>Add an Album</h2>
            <UploadForm handleUploadSubmit={handleUploadSubmit} />
        </div>
    )
}