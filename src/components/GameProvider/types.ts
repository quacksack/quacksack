import { Token } from "../../types";
import { BagApi, BagItems } from "../useBag/types";

export interface GameContextType {
  draw: () => void;
  putDrawnBack: (index: number | "all") => void;
  drawnTokens: ReadonlyArray<Token>;
  bagTotalItemCount: BagApi["totalItemCount"];
  resetGame: () => void;
  addToBag: (token: Token) => void;
  whiteTotal: number;
}

export type GameState = {
  drawnTokens: GameContextType["drawnTokens"];
  bagItems: BagItems;
};
