import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ALL_PRODUCTS } from "../gqloperation/queries";
import Card from "../components/card";
import { cardAttribute } from "../Types/type";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import request from "graphql-request";
import { CLIENT_URL } from "../helper";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  // const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS, {
  //   variables: {
  //     pagination: {
  //       page: page,
  //       pageSize: 3,
  //     },
  //   },
  // });
  // if (data) console.log(data);
  // if (error) console.log(error);

  // useEffect(() => {
  //   if (page !== 1) refetch();
  // }, [page]);

  const getProducts = () => {
    request(CLIENT_URL, GET_ALL_PRODUCTS, {
      pagination: {
        page: page,
        pageSize: 3,
      },
    })
      .then((item) => {
        setLoading(true);

        setData(item);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (page !== 1) getProducts();
  }, [page]);

  const updatePage = (page: any) => {
    setPage(page);
  };

  return (
    <div>
      <div className="homeroot">
        {loading && <h1>Loading...</h1>}
        <Search />
        <div className="homeroot">
          {data &&
            data?.products?.data?.map(({ id, attributes }: cardAttribute) => {
              console.log(attributes?.images?.data[0]?.attributes?.url);
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
            })}
        </div>
      </div>
      <Pagination
        pageCount={data?.products?.meta?.pagination?.pageCount}
        updatePage={updatePage}
      />
    </div>
  );
};

export default Home;
