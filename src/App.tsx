import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingPage from "./components/ShoppingPage";
import MainPage from "./components/MainPage";
import GameProvider from "./components/GameProvider";

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

  return (
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  );
}

export default App;
