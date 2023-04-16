import { ClipLoader } from "react-spinners";
import './Loader.scss';
const Loader = () => {
    return (<div className="Loader">
        <ClipLoader color="var(--theme)" aria-label="Loading Spinner"
            data-testid="loader" size={50}
        />
    </div>)
}

export default Loader;