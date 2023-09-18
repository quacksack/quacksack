import { Token } from "../../types";
import { BagApi, BagItems, BagOperationHistory } from "../useBag/types";

export interface GameContextType {
  draw: () => void;
  putDrawnBack: (index: number | "all") => void;
  drawnTokens: ReadonlyArray<Token>;
  bagTotalItemCount: BagApi["totalItemCount"];
  resetGame: () => void;
  addToBag: (token: Token) => void;
  deleteFromBag: (token: Token) => Token | null;
  loadComplete: boolean;
  bagOperationHistory: BagOperationHistory;
}

export type GameState = {
  drawnTokens: GameContextType["drawnTokens"];
  bagItems: BagItems;
};
