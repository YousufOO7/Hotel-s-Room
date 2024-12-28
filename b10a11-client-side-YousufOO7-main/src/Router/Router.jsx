import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayOut from "../Components/MainLayout/MainLayOut";
import Home from "../Components/Pages/Home/Home";
import Rooms from "../Routs/Rooms/Rooms";
import RoomDetails from "../Routs/RoomDetails/RoomDetails";
import SignIn from "../Components/Pages/SignIn/SignIn";
import Register from "../Components/Pages/Register/Register";
import ForgotPassword from "../Provider/ForgotPassword";
import MyBookedRooms from "../Routs/MyBookedRooms/MyBookedRooms";
import ErrorPage from "../ErrorPage/ErrorPage";
import PrivateRout from "./PrivateRout";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut></MainLayOut>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/rooms',
          element: <Rooms></Rooms>
        },
        {
          path: '/myBooking',
          element: <PrivateRout><MyBookedRooms></MyBookedRooms></PrivateRout>
        },
        {
          path: '/room/:id',
          element: <RoomDetails></RoomDetails>,
          loader: ({params}) => fetch(`https://hotel-server-side-kappa.vercel.app/rooms/${params.id}`)
        },
        {
          path: '/signIn',
          element: <SignIn></SignIn>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/forgotPassword',
          element: <ForgotPassword></ForgotPassword>
        }
      ]
    },
  ]);

  export default router