import { GET_PRODUCT } from "../gqloperation/queries";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Carousel from "@brainhubeu/react-carousel";
import { useCart } from "react-use-cart";
import { CLIENT_URL } from "../helper";
import request from "graphql-request";

const Product = () => {
  const { pid } = useParams();
  const { addItem } = useCart();

  // const { loading, error, data } = useQuery(GET_PRODUCT, {
  //   variables: {
  //     productId: pid,
  //   },
  // });

  const { isLoading, data, isError, error }: any = useQuery("get-product", () =>
    request(CLIENT_URL, GET_PRODUCT, {
      productId: pid,
    })
  );

  if (isLoading) return <h1>Loading Plz wait</h1>;
  if (isError) console.log(error);
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
