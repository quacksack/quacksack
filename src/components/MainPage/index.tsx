import React, { RefObject, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import { GameContext } from "../GameProvider";
import DrawnToken from "../DrawnToken";
import HeaderFooter from "../HeaderFooter";
import HeaderHUD from "./HeaderHUD";
import HeaderContent from "./HeaderContent";

const scrollRefToLeftMax = (ref: RefObject<HTMLDivElement | null>, scrollBehavior?: ScrollBehavior) =>
  requestAnimationFrame(() => ref.current?.scroll({ left: ref.current.scrollWidth, behavior: scrollBehavior }));

function MainPage() {
  const { loadComplete, draw, putDrawnBack, bagTotalItemCount, drawnTokens, resetGame } = useContext(GameContext);
  const currentDrawStageRef = useRef<HTMLDivElement | null>(null);

  const renderedDrawnTokens = useMemo(
    () => drawnTokens.map((token, i) => <DrawnToken key={i} token={token} onRemove={() => putDrawnBack(i)} />),
    [drawnTokens, putDrawnBack],
  );

  useEffect(() => {
    scrollRefToLeftMax(currentDrawStageRef);
  }, []);

  const onDrawClick = useCallback(() => {
    draw();
    scrollRefToLeftMax(currentDrawStageRef, "smooth");
  }, [draw]);

  return !loadComplete ? null : (
    <>
      <HeaderFooter>
        <HeaderContent>Tokens: {bagTotalItemCount}</HeaderContent>
        <HeaderHUD />
      </HeaderFooter>
      <CurrentDrawStage ref={currentDrawStageRef}>{renderedDrawnTokens}</CurrentDrawStage>
      <PrimaryActions>
        <Button onClick={onDrawClick} isDisabled={bagTotalItemCount <= 0}>
          Draw
        </Button>
        <Button to="/shop">Shopping</Button>
        <Button onClick={() => putDrawnBack("all")} isDisabled={drawnTokens.length <= 0}>
          <span style={{ fontSize: "48px" }}>Put all back</span>
        </Button>
      </PrimaryActions>
      <HeaderFooter>
        <span>
          <Button buttonType="action" buttonStyle="danger" onClick={resetGame} shouldConfirm>
            Reset game
          </Button>
        </span>
      </HeaderFooter>
    </>
  );
}

const CurrentDrawStage = styled.div({
  flex: "1 0 auto",
  display: "flex",
  flexFlow: "row nowrap",
  gap: "8px",
  width: "100%",
  overflowX: "auto",
});

const PrimaryActions = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "16px",
  flex: "0 1 auto",
  justifyContent: "space-between",
});

export default MainPage;
