import React, { useContext, useMemo } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import { GameContext } from "../GameProvider";
import DrawnToken from "../DrawnToken";
import array from "../../util/array";

function MainPage() {
  const { draw, putDrawnBack, bagTotalItemCount, drawnTokens, resetGame, whiteTotal } = useContext(GameContext);

  const renderedDrawnTokens = useMemo(
    () =>
      drawnTokens
        .map((token, i) =>
          i > drawnTokens.length - 1 - 5 ? <DrawnToken token={token} onRemove={() => putDrawnBack(i)} /> : null,
        )
        .filter(array.nonNullable),
    [drawnTokens, putDrawnBack],
  );

  return (
    <>
      <HeaderFooter>
        <h2>Tokens: {bagTotalItemCount}</h2>
        <h2>White total: {whiteTotal}</h2>
      </HeaderFooter>
      <CurrentDrawStage>{renderedDrawnTokens}</CurrentDrawStage>
      <PrimaryActions>
        <Button onClick={draw} isDisabled={bagTotalItemCount <= 0}>
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
  width: "100%",
});

const PrimaryActions = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "16px",
  flex: "0 1 auto",
  justifyContent: "space-between",
});

const HeaderFooter = styled.div({
  display: "flex",
  flex: "0 1 auto",
  alignItems: "center",
  justifyContent: "space-between",
});

export default MainPage;
