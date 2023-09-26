import { RouteObject } from "react-router-dom";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Product from "../pages/Product";
import ProductByCategory from "../pages/ProductByCategory";
import Signup from "../pages/Signup";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/product/:pid", element: <Product /> },
  { path: "/cart", element: <Cart /> },
  { path: "/category/:cid", element: <ProductByCategory /> },
];

export default routes;
