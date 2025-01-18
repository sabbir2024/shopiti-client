import { createBrowserRouter } from "react-router";
import Main from "../leyout/Main";
import Home from "../page/home/Home";
import Order from "../page/products-details/ProductDetails";
import Login from "../page/regestion/Login";
import Signup from "../page/regestion/Signup";
import PrivateRoute from "./PrivateRoute";
import Dashbord from "../leyout/Dashbord";
import Static from "../page/dashbord/static/Static";
import UserList from "../page/dashbord/user/UserList";
import AddProduct from "../page/dashbord/add-product/AddProduct";
import ProductList from "../page/dashbord/product-list/ProductList";
import AllProduct from "../page/dashbord/all-product/AllProduct";
import ProductDetails from "../UI/product-details/ProductDitails";
import AdminHostRoute from "./AdminHostRoute";
import MyOrderList from "../page/dashbord/my-order/MyOrderList";


const Route = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '',
                element: <Home />

            },
            {
                path: 'all-product',
                element: <AllProduct />
            },
            {
                path: 'all-product/:id',
                element: <PrivateRoute><ProductDetails /></PrivateRoute>

            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/dashbord',
        element: <Dashbord />,
        children: [
            {
                path: 'static',
                element: <Static />
            },
            {
                path: 'user-list',
                element: <UserList />
            },
            {
                path: 'my-order-list',
                element: <MyOrderList />
            },
            {
                path: 'add-product',
                element: <PrivateRoute><AdminHostRoute><AddProduct /></AdminHostRoute></PrivateRoute>
            },

            {
                path: 'product-list',
                element: <ProductList />
            },
        ],
    }
]);

export default Route;