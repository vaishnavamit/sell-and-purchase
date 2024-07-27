import './index.css'
import * as React from "react";
import { createRoot } from 'react-dom/client';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddNewProduct from './components/AddNewProduct';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import WishList from './components/WishList';
import ProductDetail from './components/ProductDetail';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
    ),
  },
  {
    path: "login",
    element: (<Login/>),
  },
  {
    path: "createnewaccount",
    element: (<Signup/>),
  },
  {
    path: "addproduct",
    element: (<AddNewProduct/>),
  },
  {
    path: "wishlist",
    element: (<WishList/>),
  },
  {
    path: "product/:productId",
    element: (<ProductDetail/>)
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);