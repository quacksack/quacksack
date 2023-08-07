import React, { useContext } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import { GameContext } from "../GameProvider";

function MainPage() {
  const { draw, putDrawnBack, bagTotalItemCount, drawnTokens, resetGame } = useContext(GameContext);

  return (
    <Wrapper>
      <CurrentDrawStage>
        <ul>
          {drawnTokens.map((token, i) => (
            <li key={i}>
              {token.color} {token.value}
              <div
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "24px",
                  backgroundColor: "red",
                  textAlign: "center",
                }}
                onClick={() => {
                  putDrawnBack(i);
                }}
              >
                ×
              </div>
            </li>
          ))}
        </ul>
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
  alignItems: "center",
  justifyContent: "space-between",
});

export default MainPage;
