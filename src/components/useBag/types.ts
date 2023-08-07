import { Token } from "../../types";

export class BagError extends Error {}
export type BagItems = ReadonlyArray<[Token, number]>;

export interface BagApi {
  add: (token: Token, count?: number) => void;
  maybePick: () => Token | null;
  pickOrThrow: () => Token;
  totalItemCount: number;
  setItems: (items: BagItems) => void;
}
