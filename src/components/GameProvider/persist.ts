import { GameState } from "./types";

const APP_KEY = "quacksack";

const saveToLocalStorage = (gameState: GameState) => {
  try {
    const gameData = JSON.stringify(gameState);
    window.localStorage.setItem(APP_KEY, gameData);
  } catch {}
};

const loadFromLocalStorage = (): GameState | null => {
  let gameData = null;
  try {
    gameData = window.localStorage.getItem(APP_KEY);
  } catch {}

  if (gameData === null) {
    return null;
  }
  const gameState = JSON.parse(gameData); // send it
  return gameState;
};

const clearLocalStorage = () => {
  try {
    window.localStorage.removeItem(APP_KEY);
  } catch {}
};

export { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage };
