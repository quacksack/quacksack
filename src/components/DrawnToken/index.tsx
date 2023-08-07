import React from "react";
import { Token } from "../../types";
import Button from "../Button";
import styled from "@emotion/styled";
import TokenIcon from "../TokenIcon";

const DrawnToken = function ({ token, onRemove }: { token: Token; onRemove: () => void }) {
  return (
    <Wrapper>
      <TokenIcon color={token.color} value={token.value} size="48px" />
      <Button onClick={onRemove} buttonStyle="danger" buttonType="action">
        Put back
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  justifyContent: "space-between",
});

export default DrawnToken;
