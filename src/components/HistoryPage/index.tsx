import COLORS from "../../util/colors";
import InvertedImg from "../InvertedImg";
import trashCanIconSrc from "../../icons/trash-can.png";
import addToCartIconSrc from "../../icons/add-to-cart.png";
import { BagOperation } from "../useBag/types";
import HeaderFooter from "../HeaderFooter";
import styled from "@emotion/styled";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import TokenIcon from "../TokenIcon";
import Button from "../Button";

function HistoryPage() {
  const { bagOperationHistory } = useContext(GameContext);
  return (
    <>
      <HeaderFooter>
        <h2>History</h2>
        <Button buttonType="action" to="/shop">
          Back to shop
        </Button>
      </HeaderFooter>
      <HistorySections>
        {Array.from({ length: bagOperationHistory.length }).map((_, i) => {
          // Effectively reversing the array
          const section = bagOperationHistory[bagOperationHistory.length - 1 - i];
          if (section === undefined) {
            throw new Error("invariant: section is undefined");
          }

          return (
            <HistorySection key={i}>
              {section.map((operation, operationIndex) => {
                return (
                  <TokenWithOperation key={operationIndex}>
                    <TokenIcon color={operation.token.color} value={operation.token.value} size={48} />
                    <OperationIcon operationType={operation.operationType} />
                    {(operation.count ?? 1) > 1 ? `× ${operation.count}` : null}
                  </TokenWithOperation>
                );
              })}
            </HistorySection>
          );
        })}
      </HistorySections>
    </>
  );
}

function OperationIcon({ operationType }: { operationType: BagOperation["operationType"] }) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        backgroundColor: operationType === "remove" ? COLORS.backgroundDanger : COLORS.backgroundPrimary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {operationType === "remove" ? (
        <InvertedImg src={trashCanIconSrc} alt="Remove" width="32px" />
      ) : (
        <InvertedImg src={addToCartIconSrc} alt="Added" width="32px" />
      )}
    </div>
  );
}

const HistorySections = styled.div({
  display: "flex",
  flexFlow: "column nowrap",
  gap: "32px",
  overflowY: "auto",
});

const HistorySection = styled.div({
  display: "flex",
  flexFlow: "row wrap",
  gap: "8px",
  padding: "0 0 32px 0",
  ":not(:last-of-type)": {
    borderBottom: `2px solid ${COLORS.foregroundBase}`,
  },
});

const TokenWithOperation = styled.div({
  display: "flex",
  flexFlow: "row nowrap",
});

export default HistoryPage;
