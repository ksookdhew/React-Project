import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AllProducts from "./features/allProducts/AllProducts.tsx";
import ErrorPage from "./features/error/Error.tsx";
import ProductDetails from "./features/productDetails/ProductDetails.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <AllProducts/>,
            },
            {
                path: "product/:productId",
                element: <ProductDetails/>,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
