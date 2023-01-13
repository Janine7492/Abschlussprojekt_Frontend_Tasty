
import { Link } from "react-router-dom";


function SeeAll(props) {

    return (
        <div className="seeAll">
            <Link to={props.allLink} onClick={props.functionBtn} className="seeAllButton">{props.name ? props.name : "See All"}</Link>

        </div>
    );
}


export default SeeAll;
