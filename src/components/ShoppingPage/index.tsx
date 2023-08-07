import React, { useContext } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import { ShopData } from "../../gameData";
import TokenIcon from "../TokenIcon";
import { GameContext } from "../GameProvider";

function ShoppingPage() {
  const { addToBag, bagTotalItemCount } = useContext(GameContext);

  return (
    <>
      <h2>Shopping | Tokens: {bagTotalItemCount}</h2>
      <ShopArea>
        {ShopData.map(([color, values]) => {
          return (
            <ShopRow key={color}>
              {values.map((value) => (
                <TokenIcon color={color} value={value} onClick={() => addToBag({ color, value })} />
              ))}
            </ShopRow>
          );
        })}
      </ShopArea>
      <Button to="/">Done</Button>
    </>
  );
}

const ShopArea = styled.div({
  overflowY: "auto",
  display: "flex",
  flexFlow: "column nowrap",
  gap: "16px",
  maxHeight: "70vh",
});

const ShopRow = styled.div({
  display: "flex",
  flexFlow: "row nowrap",
  gap: "8px",
});

export default ShoppingPage;
