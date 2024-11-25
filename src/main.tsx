import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import './index.css';
import Layout from "./components/Layout";
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <ProtectedRoute element={<Home />} /> },
      { path: "/login", element: <SignIn /> },
      { path: "/registration", element: <SignUp /> },
      { path: "/addBook", element: <ProtectedRoute element={<AddBook />} /> },
      { path: "/updateBook/:id", element: <ProtectedRoute element={<UpdateBook />} /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
