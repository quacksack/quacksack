import { TokenColor } from "../types";

const COLORS = {
  // base background of the app
  backgroundBase: "#2f3136",
  // background used for modals/layers on top of base
  background: "#404247",
  // background used for items on top of background e.g. buttons
  backgroundPrimary: "#626262",

  backgroundTypeActive: "#002e5f",
  backgroundTypeInstant: "#28581b",
  backgroundTypeWeapon: "#44005f",
  backgroundTypeArmor: "#36312f",

  // base foreground (text color)
  foregroundBase: "#ffffff",
  // foreground for primary attention items
  foregroundPrimary: "#ffee33",

  tokenBackground: {
    white: "#f2fdff",
    red: "#f54242",
    orange: "#ff9340",
    yellow: "#fff942",
    green: "#14c417",
    blue: "#0022ab",
    purple: "#9300c4",
    black: "#15151c",
  } satisfies Record<TokenColor, string>,

  tokenForeground: {
    white: "#000000",
    red: "#ffffff",
    orange: "#000000",
    yellow: "#000000",
    green: "#000000",
    blue: "#ffffff",
    purple: "#ffffff",
    black: "#ffffff",
  } satisfies Record<TokenColor, string>,
};

export default COLORS;
