import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import NavBar from "./components/navbar";
import routes from "./utils/router";
import "@brainhubeu/react-carousel/lib/style.css";
import { CartProvider } from "react-use-cart";
import Category from "./components/Category";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const client = new ApolloClient({
  uri: `http://localhost:1337/graphql`,
  cache: new InMemoryCache(),
});

const Routes = () => {
  const element = useRoutes(routes);
  return (
    <>
      <NavBar />
      {element}
      <Category />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <QueryClientProvider client={queryClient}>
              <Routes />
            </QueryClientProvider>
          </ApolloProvider>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
