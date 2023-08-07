import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { useBag } from "../useBag";
import { DefaultBag } from "../../gameData";
import Button from "../Button";
import { Token } from "../../types";

function MainPage() {
  const { pickOrThrow, totalItemCount } = useBag(DefaultBag);
  const [drawnItems, setDrawnItems] = useState<ReadonlyArray<Token>>([]);

  const onDraw = useCallback(() => {
    const token = pickOrThrow();
    setDrawnItems((curr) => [...curr, token]);
  }, [pickOrThrow]);

  return (
    <Wrapper>
      <CurrentDrawStage>
        <ul>
          {drawnItems.map((token, i) => (
            <li key={i}>
              {token.color} {token.value}
            </li>
          ))}
        </ul>
      </CurrentDrawStage>
      <PrimaryActions>
        <Button onClick={onDraw}>Draw</Button>
      </PrimaryActions>
      <Footer>Tokens: {totalItemCount}</Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  padding: "32px",
  height: "100%",
  width: "100%",
});

const CurrentDrawStage = styled.div({
  height: "40%",
});

const PrimaryActions = styled.div({
  display: "flex",
});

const Footer = styled.footer({
  display: "flex",
  flex: "1 0 auto",
  alignItems: "space",
  justifyContent: "space-between",
  padding: "16px",
});

export default MainPage;
