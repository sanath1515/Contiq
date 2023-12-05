import React from "react";
import { Stack, styled } from "@mui/material";
import theme from "../../../theme/theme";
import GridIcon from "../../../../public/assets/icons/grid-icon.svg";
import ListIcon from "../../../../public/assets/icons/list-icon.svg";
const StyledStack = styled(Stack)({
  flexDirection: "row",
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: "4px",
  width: "6.73vw",
  height:"2.7vw",
  gap: "4px",
  alignItems: "center",
});
const StyledGridIcon = styled("img")`
  padding: 0.7vw 0.95vw;
  background-color: ${theme.palette.primary[100]};
`;
const StyledListIcon = styled("img")`
  padding: 0.95vw;
`;
export const Filter = () => {
  return (
    <StyledStack>
      <StyledGridIcon data-testid="grid-icon" src={GridIcon} alt="grid-icon" />
      <StyledListIcon data-testid="list-icon" src={ListIcon} alt="list-icon" />
    </StyledStack>
  );
};
