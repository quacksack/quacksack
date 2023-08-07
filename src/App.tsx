import React, { useCallback, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingPage from "./components/ShoppingPage";
import MainPage from "./components/MainPage";

function App() {
  const [counter, setCounter] = useState(0);
  const increment = useCallback(() => {
    console.log("incremented");
    setCounter((c) => c + 1);
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage counter={counter} />,
    },
    {
      path: "/shop",
      element: <ShoppingPage increment={increment} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
