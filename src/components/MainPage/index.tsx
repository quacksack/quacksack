import React, { useCallback, useContext } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import { GameContext } from "../GameProvider";

function MainPage() {
  const {
    bag: { pickOrThrow, totalItemCount },
    drawnTokens: { tokens: drawnTokens, add: addDrawnToken },
  } = useContext(GameContext);

  const onDraw = useCallback(() => {
    addDrawnToken(pickOrThrow());
  }, [addDrawnToken, pickOrThrow]);

  return (
    <Wrapper>
      <CurrentDrawStage>
        <ul>
          {drawnTokens.map((token, i) => (
            <li key={i}>
              {token.color} {token.value}
            </li>
          ))}
        </ul>
      </CurrentDrawStage>
      <PrimaryActions>
        <Button onClick={onDraw} isDisabled={totalItemCount <= 0}>
          Draw
        </Button>
        <Button to="/shop">Shopping</Button>
      </PrimaryActions>
      <Footer>Tokens: {totalItemCount}</Footer>
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
  height: "40%",
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
  alignItems: "space",
  justifyContent: "space-between",
  padding: "16px",
});

export default MainPage;
