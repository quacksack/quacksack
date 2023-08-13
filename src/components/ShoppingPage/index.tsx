import React, { useCallback, useContext, useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import { ShopData } from "../../gameData";
import TokenIcon from "../TokenIcon";
import { GameContext } from "../GameProvider";
import Toast from "../Toast";
import { Token } from "../../types";

function PurchasedToast(token: Token) {
  return (
    <div style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: "8px" }}>
      <strong>Purchased</strong>
      <TokenIcon color={token.color} value={token.value} size={24} />
    </div>
  );
}

function ShoppingPage() {
  const { addToBag, bagTotalItemCount } = useContext(GameContext);
  const [toastText, setToastText] = useState<React.ReactNode>();

  const showPurchasedToast = useCallback((token: Token) => setToastText(PurchasedToast(token)), []);

  const onTokenClick = useCallback(
    (token: Token) => {
      showPurchasedToast(token);
      addToBag(token);
    },
    [addToBag, showPurchasedToast],
  );

  return (
    <>
      <h2>Shopping | Tokens: {bagTotalItemCount}</h2>
      <ShopArea>
        {ShopData.map(([color, values]) => {
          return (
            <ShopRow key={color}>
              {values.map((value) => (
                <TokenIcon color={color} value={value} onClick={() => onTokenClick({ color, value })} />
              ))}
            </ShopRow>
          );
        })}
        <Toast durationMilliseconds={500} text={toastText} />
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
