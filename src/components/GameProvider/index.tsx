import { createContext, useCallback, useMemo, useState } from "react";
import { Token } from "../../types";
import { useBag } from "../useBag";
import { GameContextType } from "./types";
import { DefaultBag } from "../../gameData";

export const GameContext = createContext<GameContextType>({
  drawnTokens: { tokens: [], add: () => {}, removeAtIndex: () => {} },
  bag: {
    add: () => {},
    maybePick: () => null,
    pickOrThrow: () => {
      throw new Error("Context not set");
    },
    totalItemCount: 0,
  },
});
GameContext.displayName = "GameContext";

const GameProvider = (props: { children: React.ReactNode }) => {
  const bag = useBag(DefaultBag);
  const [drawnItems, setDrawnItems] = useState<ReadonlyArray<Token>>([]);

  const addDrawnItem = useCallback((token: Token) => setDrawnItems((current) => [...current, token]), []);
  const removeDrawnItemAtIndex = useCallback(
    (index: number) =>
      setDrawnItems((current) => {
        const copy = [...current];
        copy.splice(index, 1);
        return copy;
      }),
    [],
  );

  const contextValue = useMemo(
    () => ({ bag, drawnTokens: { tokens: drawnItems, add: addDrawnItem, removeAtIndex: removeDrawnItemAtIndex } }),
    [addDrawnItem, bag, drawnItems, removeDrawnItemAtIndex],
  );
  return <GameContext.Provider value={contextValue}>{props.children}</GameContext.Provider>;
};

export default GameProvider;
