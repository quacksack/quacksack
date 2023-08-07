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
  whiteTotal: 0,
});
GameContext.displayName = "GameContext";

const GameProvider = (props: { children: React.ReactNode }) => {
  const bag = useBag(DefaultBag);
  const [drawnTokens, setDrawnTokens] = useState<ReadonlyArray<Token>>([]);
  const [whiteTotal, setWhiteTotal] = useState<number>(0);

  const draw = useCallback(() => {
    const token = bag.pickOrThrow();
    setDrawnTokens((current) => [...current, token]);
    setWhiteTotal((current) => (token.color === "white" ? current + token.value : current));
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
        setWhiteTotal((current) => (removed.color === "white" ? current - removed.value : current));
      } else {
        drawnTokens.forEach((token) => bag.add(token));
        setDrawnTokens([]);
        setWhiteTotal(0);
      }
    },
    [bag, drawnTokens],
  );

  const resetGame = useCallback(() => {
    setDrawnTokens([]);
    bag.setItems(DefaultBag);
    setWhiteTotal(0);
  }, [bag]);

  const contextValue = useMemo(
    () => ({
      draw,
      drawnTokens,
      putDrawnBack,
      bagTotalItemCount: bag.totalItemCount,
      resetGame,
      addToBag: bag.add,
      whiteTotal,
    }),
    [bag.add, bag.totalItemCount, draw, drawnTokens, putDrawnBack, resetGame, whiteTotal],
  );
  return <GameContext.Provider value={contextValue}>{props.children}</GameContext.Provider>;
};

export default GameProvider;
