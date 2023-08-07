import { GameState } from "./types";

const APP_KEY = "quacksack";

const saveToLocalStorage = (gameState: GameState) => {
  const gameData = JSON.stringify(gameState);
  window.localStorage.setItem(APP_KEY, gameData);
};

const loadFromLocalStorage = (): GameState | null => {
  const gameData = window.localStorage.getItem(APP_KEY);
  if (!gameData) {
    return null;
  }
  const gameState = JSON.parse(gameData); // send it
  return gameState;
};

const clearLocalStorage = () => {
  window.localStorage.removeItem(APP_KEY);
};

export { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage };
