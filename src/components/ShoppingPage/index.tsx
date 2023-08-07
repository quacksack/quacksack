import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function ShoppingPage() {
  return (
    <Wrapper>
      Shopping
      <Link to="/">Back to main</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  padding: "32px",
});

export default ShoppingPage;
