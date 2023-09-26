import React, { useEffect, useState } from "react";
import Card from "../components/card";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import request from "graphql-request";
import { CLIENT_URL } from "../helper";
import { useQuery } from "react-query";
import { LOGIN_USER } from "../gqloperation/mutation";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  // const [data, setData] = useState<any>();
  // const [loading, setLoading] = useState(true);

  const variables = {
    pagination: {
      page: page,
      pageSize: 3,
    },
  };

  const fetchLogin: any = request(CLIENT_URL, LOGIN_USER, variables);

  const { isLoading, error, data, refetch }: any = useQuery(
    "products",
    fetchLogin
  );
  if (data) console.log(data);
  if (error) console.log(error);

  useEffect(() => {
    if (page !== 1) refetch();
  }, [page, refetch]);

  const updatePage = (page: any) => {
    setPage(page);
  };

  return (
    <div>
      <div className="homeroot">
        {isLoading && <h1>Loading...</h1>}
        <Search />
        <div className="homeroot">
          {data &&
            data?.products?.data?.map(({ id, attributes }: any) => {
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
