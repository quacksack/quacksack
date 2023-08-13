import React, { useCallback, useContext, useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import { ShopData } from "../../gameData";
import TokenIcon from "../TokenIcon";
import { GameContext } from "../GameProvider";
import Toast from "../Toast";
import { Token } from "../../types";
import HeaderFooter from "../HeaderFooter";
import trashCanIconSrc from "./icons/trash-can.png";
import addToCartIconSrc from "./icons/add-to-cart.png";
import InvertedImg from "../InvertedImg";

function PurchasedToast(token: Token, inDeleteMode: boolean) {
  return (
    <div style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: "8px" }}>
      <strong>{inDeleteMode ? "Removed" : "Purchased"}</strong>
      <TokenIcon color={token.color} value={token.value} size={24} />
    </div>
  );
}

function ShoppingPage() {
  const { addToBag, deleteFromBag, bagTotalItemCount } = useContext(GameContext);
  const [inDeleteMode, setDeleteMode] = useState<boolean>(false);
  const [toastText, setToastText] = useState<React.ReactNode>();

  const showPurchasedToast = useCallback(
    (token: Token, inDeleteMode: boolean) => setToastText(PurchasedToast(token, inDeleteMode)),
    [],
  );

  const onTokenClick = useCallback(
    (token: Token) => {
      if (!inDeleteMode) {
        addToBag(token);
        showPurchasedToast(token, inDeleteMode);
      } else {
        const success = deleteFromBag(token);
        if (success) {
          showPurchasedToast(token, inDeleteMode);
        } else {
          setToastText(<div style={{ textAlign: "center" }}>None in bag</div>);
        }
      }
    },
    [addToBag, deleteFromBag, inDeleteMode, showPurchasedToast],
  );

  const changeDeleteMode = useCallback((newValue: boolean) => {
    setDeleteMode(newValue);
    setToastText(<div style={{ textAlign: "center" }}>{newValue ? "Delete mode" : "Shopping mode"}</div>);
  }, []);

  return (
    <>
      <HeaderFooter>
        <h2>Tokens: {bagTotalItemCount}</h2>
        {!inDeleteMode ? (
          <Button onClick={() => changeDeleteMode(true)} buttonStyle="danger" buttonType="action">
            <InvertedImg src={trashCanIconSrc} alt="Delete mode" width="32px" />
          </Button>
        ) : (
          <Button onClick={() => changeDeleteMode(false)} buttonType="action">
            <InvertedImg src={addToCartIconSrc} alt="Shopping mode" width="32px" />
          </Button>
        )}
      </HeaderFooter>
      <ShopArea style={{ background: inDeleteMode ? "#a11637" : "none" }}>
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
