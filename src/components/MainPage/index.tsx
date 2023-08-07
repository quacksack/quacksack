import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function MainPage({ counter }: { counter: number }) {
  return (
    <Wrapper>
      Main: {counter}
      <br />
      <Link to="/shop">To shop</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  padding: "32px",
});

export default MainPage;
