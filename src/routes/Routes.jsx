import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AvailableFoods from "../pages/AvailableFoods/AvailableFoods";
import AddFood from "../pages/AddFood/AddFood";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import ManageMyFoods from "../pages/ManageMyFoods/ManageMyFoods";
import MyFoodRequests from "../pages/MyFoodRequests/MyFoodRequests";
import UpdateFood from "../pages/UpdateFood/UpdateFood";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/available-foods",
                element: <AvailableFoods />,
            },
            {
                path: "/add-food",
                element: <PrivateRoute><AddFood /></PrivateRoute>,
            },
            {
                path: "/foods/:id",
                element: <PrivateRoute><FoodDetails /></PrivateRoute>,
            },
            {
                path: "/manage-my-foods",
                element: <PrivateRoute><ManageMyFoods /></PrivateRoute>,
            },
            {
                path: "/my-food-requests",
                element: <PrivateRoute><MyFoodRequests /></PrivateRoute>,
            },
            {
                path: "/update-food/:id",
                element: <PrivateRoute><UpdateFood /></PrivateRoute>,
            },
        ],
    },
]);

export default router;