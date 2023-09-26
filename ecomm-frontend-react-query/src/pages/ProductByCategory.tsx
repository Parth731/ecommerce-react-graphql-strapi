import { useParams } from "react-router";
import { useQuery } from "react-query";
import { GET_PRODUCT_BY_CATEGORY } from "../gqloperation/queries";
import Card from "../components/card";
import { CLIENT_URL } from "../helper";
import request from "graphql-request";

const ProductByCategory = () => {
  const { cid } = useParams();

  // apollo client
  // const { loading, data } = useQuery(GET_PRODUCT_BY_CATEGORY, {
  //   variables: {
  //     categoryId: cid,
  //   },
  // });

  const { isLoading, data }: any = useQuery("get-product-by-category", () =>
    request(CLIENT_URL, GET_PRODUCT_BY_CATEGORY, {
      categoryId: cid,
    })
  );

  if (isLoading) return <h1>loading...</h1>;
  return (
    <div>
      <div className="homeroot">
        {data.category.data.attributes.products.data.map(
          ({ id, attributes }: any) => {
            return (
              <Card
                key={id}
                id={id}
                name={attributes.name}
                price={attributes.price}
                description={attributes.description}
                img={attributes.images.data[0].attributes.url}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default ProductByCategory;
