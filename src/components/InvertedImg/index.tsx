import styled from "@emotion/styled";

/**
 * `img` with colors inverted, useful for turning black icons white
 */
const InvertedImg = styled.img({
  filter: "brightness(0) invert(1)",
});

export default InvertedImg;
