import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingPage from "./components/ShoppingPage";
import MainPage from "./components/MainPage";
import GameProvider from "./components/GameProvider";
import styled from "@emotion/styled";
import "normalize.css";

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
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    </GameProvider>
  );
}

const Wrapper = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  width: "100%",
  height: "100%",
  padding: "32px",
  gap: "16px",
});

export default App;
