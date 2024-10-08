import React from 'react'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import ErrorPage from './pages/ErrorPage.tsx';
import Carpool from './pages/Carpool.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import Home from './pages/Home.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import './index.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "carpool",
        element: <ProtectedRoute><Carpool /></ProtectedRoute>,
      },
      {
        path: "user",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
