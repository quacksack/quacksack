import { createContext, useCallback, useMemo, useState } from "react";
import { Token } from "../../types";
import { useBag } from "../useBag";
import { GameContextType } from "./types";
import { DefaultBag } from "../../gameData";

export const GameContext = createContext<GameContextType>({
  draw: () => {},
  putDrawnBack: () => {},
  drawnTokens: [],
  bagTotalItemCount: 0,
  resetGame: () => {},
  addToBag: () => {},
});
GameContext.displayName = "GameContext";

const GameProvider = (props: { children: React.ReactNode }) => {
  const bag = useBag(DefaultBag);
  const [drawnTokens, setDrawnTokens] = useState<ReadonlyArray<Token>>([]);

  const draw = useCallback(() => {
    const token = bag.pickOrThrow();
    setDrawnTokens((current) => [...current, token]);
  }, [bag]);

  const putDrawnBack = useCallback(
    (index: number | "all") => {
      if (typeof index === "number") {
        const copy = [...drawnTokens];
        const [removed] = copy.splice(index, 1);
        if (removed === undefined) {
          throw new Error(`Tried to remove item ${index} from drawn items but it didn't exist`);
        }

        bag.add(removed);

        setDrawnTokens(copy);
      } else {
        drawnTokens.forEach((token) => bag.add(token));
        setDrawnTokens([]);
      }
    },
    [bag, drawnTokens],
  );

  const resetGame = useCallback(() => {
    setDrawnTokens([]);
    bag.setItems(DefaultBag);
  }, [bag]);

  const contextValue = useMemo(
    () => ({ draw, drawnTokens, putDrawnBack, bagTotalItemCount: bag.totalItemCount, resetGame, addToBag: bag.add }),
    [bag.add, bag.totalItemCount, draw, drawnTokens, putDrawnBack, resetGame],
  );
  return <GameContext.Provider value={contextValue}>{props.children}</GameContext.Provider>;
};

export default GameProvider;
