import { Link } from "react-router-dom";
import { BACKEND_URL } from "../helper";

const Card = ({ id, name, price, description, img }: any) => {
  console.log(`${BACKEND_URL + img}`);
  return (
    <Link className="pcard" to={`/product/${id}`}>
      <div className="card">
        <div className="card-image">
          <img className="cimg" src={`${img}`} alt="images" />
        </div>
        <div className="card-content black-text">
          <span className="card-title truncate">{name}</span>
          <p className="truncate">{description}</p>
          <h6 className="green-text">₹ {price}</h6>
        </div>
      </div>
    </Link>
  );
};

export default Card;
