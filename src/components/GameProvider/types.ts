import { Token } from "../../types";
import { BagApi, BagItems } from "../useBag/types";
import { OperationHistoryApi } from "../useOperationHistory/types";

export interface ShoppingOperation {
  token: Token;
  count?: number;
  operationType: "add" | "delete";
}

export interface GameContextType {
  draw: () => void;
  putDrawnBack: (index: number | "all") => void;
  drawnTokens: ReadonlyArray<Token>;
  bagTotalItemCount: BagApi["totalItemCount"];
  resetGame: () => void;
  addToBag: (token: Token) => void;
  deleteFromBag: (token: Token) => Token | null;
  loadComplete: boolean;
  shoppingOperationHistory: OperationHistoryApi<ShoppingOperation>["operationHistory"];
  recordShoppingOperationHistory: OperationHistoryApi<ShoppingOperation>["recordOperationHistory"];
  resetShoppingOperationHistory: OperationHistoryApi<ShoppingOperation>["resetHistory"];
}

export type GameState = {
  drawnTokens: GameContextType["drawnTokens"];
  bagItems: BagItems;
};
