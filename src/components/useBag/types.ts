import { Token } from "../../types";

export class BagError extends Error {}
export type BagItems = ReadonlyArray<[Token, number]>;

export const MaxTokenCount = 100;

export interface BagOperation {
  token: Token;
  count?: number;
  operationType: "add" | "remove";
}

export type BagOperationHistorySection = ReadonlyArray<BagOperation>;
export type BagOperationHistory = ReadonlyArray<BagOperationHistorySection>;

export interface BagApi {
  add: (token: Token, count?: number) => void;
  maybeDelete: (token: Token, count?: number) => Token | null;
  maybePick: () => Token | null;
  pickOrThrow: () => Token;
  totalItemCount: number;
  setItems: (items: BagItems) => void;
  items: BagItems;
  operationHistory: BagOperationHistory;
}
