import styled from "@emotion/styled";
import React, { useCallback, useState, ReactNode } from "react";
import COLORS from "../../util/colors";
import { Link } from "react-router-dom";

export type ButtonType = "base" | "action";
export type ButtonStyle = "danger" | "default" | "primary";

export const BaseButton = styled.button({
  border: `solid 3px ${COLORS.foregroundPrimary}`,
  color: `${COLORS.foregroundPrimary}`,
  backgroundColor: `${COLORS.background}`,
  fontSize: "72px",
  height: "96px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  appearance: "none",
  padding: 0,
  [`&[disabled], &[aria-disabled="true"]`]: { opacity: "10%", filter: "grayscale(100%)" },
});

export const ActionButton = styled.button<{ buttonStyle?: ButtonStyle }>(({ buttonStyle = "default" }) => {
  const rgbMap: { [k in typeof buttonStyle]: string } = {
    default: "98, 98, 98",
    danger: "196, 0, 0",
    primary: "255, 238, 51",
  };
  return {
    appearance: "none",
    height: "58px",
    padding: "12px",
    border: "1px solid black",
    borderRadius: "4px",
    fontSize: "18px",
    fontWeight: "bold",
    color:
      buttonStyle === "primary"
        ? COLORS.backgroundBase
        : buttonStyle === "danger"
        ? COLORS.foregroundBase
        : COLORS.foregroundPrimary,
    backgroundColor: `rgb(${rgbMap[buttonStyle]})`,
    "&:active": { filter: "brightness(0.7)" },
    [`&[disabled], &[aria-disabled="true"]`]: { opacity: "10%", filter: "grayscale(100%)" },
  };
});

type ButtonComponent = typeof BaseButton | typeof ActionButton;

const BUTTON_TYPE_TO_COMPONENT: Record<ButtonType, ButtonComponent> = {
  base: BaseButton,
  action: ActionButton,
};

interface Props {
  onClick?: () => void;
  children: ReactNode;
  buttonProps?: { [key: string]: any };
  buttonType?: ButtonType;
  buttonStyle?: ButtonStyle;
  shouldConfirm?: boolean;
  isDisabled?: boolean;
  to?: string;
}

const Button = ({
  onClick,
  children,
  buttonProps,
  buttonType = "base",
  buttonStyle = "default",
  shouldConfirm = false,
  isDisabled = false,
  to,
}: Props) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (isDisabled) {
      return;
    }

    if (!shouldConfirm) {
      onClick?.();
      return;
    }

    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      onClick?.();
      setIsConfirming(false);
    }
  }, [isDisabled, shouldConfirm, isConfirming, onClick]);

  const ButtonComponent = BUTTON_TYPE_TO_COMPONENT[buttonType];

  const renderedButton = (
    <ButtonComponent
      aria-disabled={isDisabled}
      disabled={isDisabled}
      type="button"
      onClick={handleClick}
      buttonStyle={shouldConfirm && isConfirming ? "primary" : buttonStyle}
      {...buttonProps}
    >
      {shouldConfirm && isConfirming ? "Confirm" : children}
    </ButtonComponent>
  );

  return to !== undefined ? (
    <Link style={{ textDecoration: "none" }} to={to}>
      {renderedButton}
    </Link>
  ) : (
    renderedButton
  );
};

export default Button;
