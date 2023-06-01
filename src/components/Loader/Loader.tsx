import { ClipLoader } from "react-spinners";
import './Loader.scss';
const Loader = ({ size = 50 }: { size?: number }) => {
    return (<div className="Loader">
        <ClipLoader color="var(--theme)" aria-label="Loading Spinner"
            data-testid="loader" size={size}
        />
    </div>)
}

export default Loader;