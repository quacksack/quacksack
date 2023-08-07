export type TokenColor = "white" | "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "black";
export type TokenValue = 1 | 2 | 3 | 4;

export interface Token {
  color: TokenColor;
  value: TokenValue;
}

export const isTokenColor = (color: unknown): color is TokenColor =>
  typeof color === "string" && ["white", "red", "orange", "yellow", "green", "blue", "purple", "black"].includes(color);

export const isTokenValue = (value: unknown): value is TokenValue =>
  value === 1 || value === 2 || value === 3 || value === 4;