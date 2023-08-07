import React from "react";
import { Token } from "../../types";
import COLORS from "../../util/colors";

const TokenIcon = function (props: Token & { size?: React.CSSProperties["width"] }) {
  const size = props.size ?? "64px";
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: COLORS.tokenBackground[props.color],
        color: COLORS.tokenForeground[props.color],
        display: "flex",
        fontSize: "36px",
        fontWeight: "700",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.value}
    </div>
  );
};

export default TokenIcon;
