import React from "react";
import { Token } from "../../types";
import COLORS from "../../util/colors";

const TokenIcon = function (props: Token & { size?: number; onClick?: () => void }) {
  const size = props.size ?? 64;
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: COLORS.tokenBackground[props.color],
        color: COLORS.tokenForeground[props.color],
        display: "flex",
        fontSize: `${(36 / 64) * size}px`,
        fontWeight: "700",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={props.onClick}
    >
      {props.value}
    </div>
  );
};

export default TokenIcon;
