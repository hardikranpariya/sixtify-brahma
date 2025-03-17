import { styled } from "@mui/material";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import { ComponentType } from "react";

interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const StyledAppBar: ComponentType<StyledAppBarProps> = styled(
  MuiAppBar,
  {
    shouldForwardProp: (prop) => prop !== "open",
  }
)<StyledAppBarProps>(({ theme, open }) => ({
  background: theme.palette.app.color.iron[600],
  boxShadow: "unset",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: "80px",
  width: "calc(100% - 80px)",
  ...(open && {
    marginLeft: "300px",
    width: "calc(100% - 300px)",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
