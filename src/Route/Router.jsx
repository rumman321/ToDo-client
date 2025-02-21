import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import ADDTask from "../Pages/ADDTask";
import Signup from "../Component/Signup/Signup";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/addTask',
            element:<ADDTask></ADDTask>
        },
        {
            path:'/signup',
            element:<Signup></Signup>
        }
      ]
    },
  ]);