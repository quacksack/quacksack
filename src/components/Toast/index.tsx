import { useCallback, useEffect, useRef, useState } from "react";
import COLORS from "../../util/colors";
import styled from "@emotion/styled";

const Toast = ({ durationMilliseconds = 2500, text }: { durationMilliseconds?: number; text?: React.ReactNode }) => {
  const dismissTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [isTimeoutComplete, setTimeoutComplete] = useState(false);

  const dismiss = useCallback(() => {
    if (dismissTimeout.current !== undefined) {
      setTimeoutComplete(true);
      clearTimeout(dismissTimeout.current);
      dismissTimeout.current = undefined;
    }
  }, [dismissTimeout]);

  useEffect(() => {
    if (text !== undefined) {
      setTimeoutComplete(false);
      dismissTimeout.current = setTimeout(dismiss, durationMilliseconds);
      return dismiss;
    }
  }, [dismiss, dismissTimeout, durationMilliseconds, text]);

  if (text === undefined || isTimeoutComplete) {
    return null;
  }

  return (
    <Container>
      <ContentWrapper>
        <Content onPointerDown={dismiss}>{text}</Content>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  z-index: 42070;
`;

const ContentWrapper = styled.div({
  width: "calc(min(100%, 540px))",
});

const Content = styled.div({
  color: COLORS.foregroundPrimary,
  width: "100%",
  padding: "16px",
  border: `4px solid ${COLORS.foregroundPrimary}`,
  backgroundColor: COLORS.background,
  fontSize: "18px",
  pointerEvents: "auto",
});

export default Toast;