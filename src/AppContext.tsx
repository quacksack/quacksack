import { createContext } from "react";

export type AppInputTheme = "DANGER" | undefined;

export type AppContextType = {
  setAppInputTheme: (theme: AppInputTheme) => void;
};

export const AppContext = createContext<AppContextType>({
  setAppInputTheme: () => {},
});
AppContext.displayName = "AppContext";
