import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Token } from "../../types";
import { useBag } from "../useBag";
import { GameContextType, ShoppingOperation } from "./types";
import { DefaultBag } from "../../gameData";
import { loadFromLocalStorage, saveToLocalStorage } from "./persist";
import { useOperationHistory } from "../useOperationHistory";
import { useMount } from "../useMount/useMount";

export const GameContext = createContext<GameContextType>({
  draw: () => {},
  putDrawnBack: () => {},
  drawnTokens: [],
  bagTotalItemCount: 0,
  resetGame: () => {},
  addToBag: () => {},
  deleteFromBag: () => null,
  loadComplete: false,
  shoppingOperationHistory: [],
  recordShoppingOperationHistory: () => {},
  resetShoppingOperationHistory: () => {},
});
GameContext.displayName = "GameContext";

const GameProvider = (props: { children: React.ReactNode }) => {
  const bag = useBag(DefaultBag);
  const { operationHistory, recordOperationHistory, resetHistory } = useOperationHistory<ShoppingOperation>();
  const [drawnTokens, setDrawnTokens] = useState<ReadonlyArray<Token>>([]);

  const [hasAttemptedLoad, setHasAttemptedLoad] = useState<boolean>(false);

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
    bag.setItems(DefaultBag);
    setDrawnTokens([]);
    resetHistory();
  }, [bag, resetHistory]);

  useMount(() => {
    const existingState = loadFromLocalStorage();

    if (existingState !== null) {
      bag.setItems(existingState.bagItems);
      setDrawnTokens(existingState.drawnTokens);
      resetHistory();
    }

    setHasAttemptedLoad(true);
  });

  useEffect(() => {
    if (hasAttemptedLoad) {
      saveToLocalStorage({ drawnTokens, bagItems: bag.items });
    }
  }, [bag.items, drawnTokens, hasAttemptedLoad]);

  const contextValue = useMemo(
    () => ({
      draw,
      drawnTokens,
      putDrawnBack,
      bagTotalItemCount: bag.totalItemCount,
      resetGame,
      addToBag: bag.add,
      deleteFromBag: bag.maybeDelete,
      loadComplete: hasAttemptedLoad,
      shoppingOperationHistory: operationHistory,
      recordShoppingOperationHistory: recordOperationHistory,
      resetShoppingOperationHistory: resetHistory,
    }),
    [
      bag.add,
      bag.maybeDelete,
      bag.totalItemCount,
      draw,
      drawnTokens,
      hasAttemptedLoad,
      operationHistory,
      putDrawnBack,
      recordOperationHistory,
      resetGame,
      resetHistory,
    ],
  );

  return <GameContext.Provider value={contextValue}>{props.children}</GameContext.Provider>;
};

export default GameProvider;
