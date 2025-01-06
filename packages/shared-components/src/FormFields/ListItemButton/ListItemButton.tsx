import {
  Stack,
  type ListItemButtonProps as MuiListItemButtonProps,
} from "@mui/material";
import type { ReactNode } from "react";
import { Tooltip } from "../../Tooltip";
import { StyledListItemButton } from "./ListItemButton.styled";

export type ListItemButtonProps = MuiListItemButtonProps & {
  label: string;
  actions?: ReactNode;
};

export function ListItemButton({
  label,
  selected,
  actions,
  ...restListItemButtonProps
}: ListItemButtonProps) {
  return (
    <StyledListItemButton
      selected={selected}
      alignItems="flex-start"
      {...restListItemButtonProps}
    >
      <Stack
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Tooltip toolTipLabel={label}>{label}</Tooltip>
        {actions}
      </Stack>
    </StyledListItemButton>
  );
}
