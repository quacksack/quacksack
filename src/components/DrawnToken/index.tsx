import React from "react";
import { Token } from "../../types";
import Button from "../Button";
import styled from "@emotion/styled";
import TokenIcon from "../TokenIcon";
import undoIconSrc from "./undo-circular-arrow.png";

const DrawnToken = function ({ token, onRemove }: { token: Token; onRemove: () => void }) {
  return (
    <Wrapper>
      <TokenIcon color={token.color} value={token.value} size={56} />
      <Button onClick={onRemove} buttonStyle="danger" buttonType="action">
        <img src={undoIconSrc} style={{ filter: "brightness(0) invert(1)" }} alt="Back to bag" width="32px" />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  width: "20%",
});

export default DrawnToken;
