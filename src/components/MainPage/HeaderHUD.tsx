import { useCallback, useContext, useMemo, useState } from "react";
import { GameContext } from "../GameProvider";
import array from "../../util/array";
import HeaderContent from "./HeaderContent";
import COLORS from "../../util/colors";

const HUDTypes = ["WhiteTotal", "EssenceColors"] as const;

function HeaderHUD() {
  const [displayedHUDIndex, setDisplayedHUDIndex] = useState<number>(0);
  const { drawnTokens } = useContext(GameContext);

  const { whiteTotal, essenceColors } = useMemo(
    () => ({
      whiteTotal: drawnTokens.reduce((accum, curr) => (curr.color === "white" ? accum + curr.value : accum), 0),
      essenceColors: new Set(
        drawnTokens.map((t) => (t.color !== "white" ? t.color : undefined)).filter(array.nonNullable),
      ).size,
    }),
    [drawnTokens],
  );

  const cycleHUD = useCallback(
    () => setDisplayedHUDIndex((currentHUDIndex) => (currentHUDIndex + 1) % HUDTypes.length),
    [],
  );

  let hudContent;
  const displayedHUD = HUDTypes[displayedHUDIndex];

  switch (displayedHUD) {
    case "WhiteTotal":
      hudContent = `White total: ${whiteTotal}`;
      break;
    case "EssenceColors":
      hudContent = `Essence colors: ${essenceColors}`;
      break;
    default:
      throw new Error(`invariant displayedHUD: ${displayedHUD}`);
  }

  return (
    <HeaderContent onClick={cycleHUD}>
      <div style={{ display: "flex", gap: "4px" }}>
        <span>{hudContent}</span>
        <span>
          <ChevronRight />
        </span>
      </div>
    </HeaderContent>
  );
}

const ChevronRight = function () {
  const width = 10;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ width, height: width * 1.6 }}>
      <path
        fill={COLORS.foregroundBase}
        d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
      />
    </svg>
  );
};

export default HeaderHUD;
