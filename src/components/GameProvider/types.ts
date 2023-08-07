import { Token } from "../../types";
import { BagApi, BagItems } from "../useBag/types";

export interface GameContextType {
  drawnTokens: {
    tokens: ReadonlyArray<Token>;
    add: (token: Token) => void;
    removeAtIndex: (index: number) => void;
  };
  bag: BagApi;
}

export type GameState = {
  drawnTokens: GameContextType["drawnTokens"]["tokens"];
  bagItems: BagItems;
};
