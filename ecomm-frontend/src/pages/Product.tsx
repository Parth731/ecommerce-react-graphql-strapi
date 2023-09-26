import { GET_PRODUCT } from "../gqloperation/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Carousel from "@brainhubeu/react-carousel";
import { useCart } from "react-use-cart";
import { BACKEND_URL } from "../helper";

const Product = () => {
  const { pid } = useParams();
  const { addItem } = useCart();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: pid,
    },
  });
  if (loading) return <h1>Loading Plz wait</h1>;
  if (error) console.log(error);
  if (data) console.log(data);

  const { name, price, description, images } = data.product.data.attributes;

  const addToCart = () => {
    const value: any = {
      id: pid,
      name,
      price,
      img: images.data[0].attributes.url,
    };
    addItem(value);
  };

  return (
    <div className="container">
      <Carousel plugins={["arrows"]} className="carousel-container">
        {images.data.map(({ attributes }: any) => {
          return (
            <img
              key={attributes.name}
              style={{ height: "50vh" }}
              src={`${attributes.url}`}
              alt="carousel-images"
            />
          );
        })}
      </Carousel>
      {/* <Dots
        number={images.data.length}
        value={value}
        onChange={onChange}
        thumbnails={images.data.map(({ attributes }: any) => {
          return (
            <img
              key={attributes.name}
              style={{ height: "100px" }}
              src={`${BACKEND_URL}${attributes.url}`}
              alt="carousel-images"
            />
          );
        })}
      /> */}

      <div>
        <h3>{name}</h3>
        <h5 className="green-text" style={{ fontWeight: "bold" }}>
          ₹ {price}
        </h5>
        <p>{description}</p>
        <button className="btn blue" onClick={() => addToCart()}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
