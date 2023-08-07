import { Token } from "../../types";

export class BagError extends Error {}

export interface BagApi {
  add: (token: Token, count?: number) => void;
  maybePick: () => Token | null;
  pickOrThrow: () => Token;
  totalItemCount: number;
}

export type BagItems = ReadonlyArray<[Token, number]>;
