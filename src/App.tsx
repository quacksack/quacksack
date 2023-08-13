import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingPage from "./components/ShoppingPage";
import MainPage from "./components/MainPage";
import GameProvider from "./components/GameProvider";
import styled from "@emotion/styled";
import "normalize.css";
import { AppContext, AppInputTheme } from "./AppContext";
import COLORS from "./util/colors";

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

  const [appInputTheme, setAppInputTheme] = useState<AppInputTheme>();

  return (
    <AppContext.Provider value={{ setAppInputTheme }}>
      <GameProvider>
        <Wrapper style={{ backgroundColor: appInputTheme === "DANGER" ? COLORS.backgroundDanger : undefined }}>
          <RouterProvider router={router} />
        </Wrapper>
      </GameProvider>
    </AppContext.Provider>
  );
}

const Wrapper = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  width: "100%",
  height: "100%",
  padding: "32px",
  gap: "16px",
  maxWidth: "540px",
  margin: "0 auto",
  transition: "background 200ms",
});

export default App;
