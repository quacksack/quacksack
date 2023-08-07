import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingPage from "./components/ShoppingPage";
import MainPage from "./components/MainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/shop",
      element: <ShoppingPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
