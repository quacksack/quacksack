import React, { useContext, useMemo } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import { GameContext } from "../GameProvider";
import DrawnToken from "../DrawnToken";

function MainPage() {
  const { draw, putDrawnBack, bagTotalItemCount, drawnTokens, resetGame } = useContext(GameContext);
  const lastFiveTokens = useMemo(() => drawnTokens.slice(-5), [drawnTokens]);

  return (
    <Wrapper>
      <CurrentDrawStage>
        {lastFiveTokens.map((token, i) => (
          <DrawnToken token={token} onRemove={() => putDrawnBack(i)} />
        ))}
      </CurrentDrawStage>
      <PrimaryActions>
        <Button onClick={draw} isDisabled={bagTotalItemCount <= 0}>
          Draw
        </Button>
        <Button to="/shop">Shopping</Button>
        <Button onClick={() => putDrawnBack("all")} isDisabled={drawnTokens.length <= 0}>
          <span style={{ fontSize: "50px" }}>Put all back</span>
        </Button>
      </PrimaryActions>
      <Footer>
        <span>Tokens: {bagTotalItemCount}</span>
        <span>
          <Button buttonType="action" buttonStyle="danger" onClick={resetGame} shouldConfirm>
            Reset game
          </Button>
        </span>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "space-between",
  padding: "32px",
  height: "100%",
  width: "100%",
});

const CurrentDrawStage = styled.div({
  height: "350px",
});

const PrimaryActions = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "16px",
  flex: "1 1 auto",
});

const Footer = styled.footer({
  display: "flex",
  flex: "0 1 auto",
  alignItems: "center",
  justifyContent: "space-between",
});

export default MainPage;
