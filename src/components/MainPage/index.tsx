import React, { useContext, useMemo } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import { GameContext } from "../GameProvider";
import DrawnToken from "../DrawnToken";
import array from "../../util/array";

function MainPage() {
  const { draw, putDrawnBack, bagTotalItemCount, drawnTokens, resetGame } = useContext(GameContext);

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
    <Wrapper>
      <HeaderFooter>
        <span>Tokens: {bagTotalItemCount}</span>
      </HeaderFooter>
      <CurrentDrawStage>{renderedDrawnTokens}</CurrentDrawStage>
      <PrimaryActions>
        <Button onClick={draw} isDisabled={bagTotalItemCount <= 0}>
          Draw
        </Button>
        <Button to="/shop">Shopping</Button>
        <Button onClick={() => putDrawnBack("all")} isDisabled={drawnTokens.length <= 0}>
          <span style={{ fontSize: "50px" }}>Put all back</span>
        </Button>
      </PrimaryActions>
      <HeaderFooter>
        <span>
          <Button buttonType="action" buttonStyle="danger" onClick={resetGame} shouldConfirm>
            Reset game
          </Button>
        </span>
      </HeaderFooter>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "space-between",
  padding: "32px",
  height: "100%",
  maxWidth: "540px",
  gap: "16px",
});

const CurrentDrawStage = styled.div({
  height: "320px",
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
