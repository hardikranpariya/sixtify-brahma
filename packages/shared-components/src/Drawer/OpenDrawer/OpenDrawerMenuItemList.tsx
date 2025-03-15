"use client";

import { Box, List, useTheme } from "@mui/material";
import { isEmpty as _isEmpty } from "lodash";
import { type HTMLAttributeAnchorTarget, useEffect, useState } from "react";
import { urlToNestedObject } from "../../utils/urlToNestedObject";
import type { MenuItem } from "../Drawer";
import { OpenDrawerCollapse } from "./OpenDrawerCollapse";
import { OpenDrawerMenuItem } from "./OpenDrawerMenuItem";

type OpenDrawerMenuItemListProps = {
  menuItems: MenuItem[];
  currentPathname: string;
};

export type NestedMenuState = {
  [K in MenuItem["key"]]?:
    | boolean
    | {
        [SubK in MenuItem["key"]]?: boolean | NestedMenuState;
      };
};

type MenuItemRecursiveProps = {
  menuItem: MenuItem;
  level?: number;
  parentPath?: string;
  subMenusOpen: NestedMenuState;
  setSubMenusOpen: (
    value: NestedMenuState | ((prev: NestedMenuState) => NestedMenuState)
  ) => void;
  currentPathMenuOpen: NestedMenuState;
};

const getNestedMenuState = (state: NestedMenuState, path: string[]) => {
  if (path.length === 0) {
    return false;
  }

  if (typeof state !== "object") {
    return false;
  }

  const first = path[0];

  if (!first) {
    return false;
  }

  const rest = path.slice(1);

  const nextState = state[first];

  if (rest.length === 0) {
    return Boolean(nextState);
  }

  return getNestedMenuState(nextState as NestedMenuState, rest);
};

export const isMenuOpen = (state: NestedMenuState, path: string[]) => {
  const value = getNestedMenuState(state, path);

  return Boolean(value);
};

export const MenuItemRecursive = ({
  menuItem,
  level = 0,
  parentPath = "",
  subMenusOpen,
  setSubMenusOpen,
  currentPathMenuOpen,
}: MenuItemRecursiveProps) => {
  const theme = useTheme();

  if (level === 3) {
    return;
  }

  const { butterflyBlue, slate } = theme.palette.app.color;

  const { key, icon, title, onClick, menuItems = [] } = menuItem;

  const currentPath = parentPath ? `${parentPath}/${key}` : key;

  const pathArray = currentPath.split("/");

  const isMenuSelected = isMenuOpen(subMenusOpen, pathArray);

  const dynamicPadding = level * 3 + 1.5;

  const handleClick = (target?: HTMLAttributeAnchorTarget) => {
    if (menuItems.length > 0) {
      setSubMenusOpen((prev) => {
        const newState = { ...prev };

        let current = newState;

        for (let i = 0; i < pathArray.length - 1; i++) {
          const segment = pathArray[i];

          if (!segment) {
            continue;
          }

          current[segment] =
            typeof current[segment] === "object" ? current[segment] : {};
          current = current[segment] as NestedMenuState;
        }

        const lastSegment = pathArray[pathArray.length - 1];

        if (lastSegment) {
          current[lastSegment] = !isMenuSelected;
        }

        return newState;
      });
    } else if (onClick && !isMenuSelected) {
      const path = key === "home" ? "/" : `/${currentPath}`;

      onClick(path, target);
    }
  };

  return (
    <Box key={key}>
      <OpenDrawerMenuItem
        sx={{
          paddingLeft: dynamicPadding,
          ":focus-visible": {
            border: `1px solid ${butterflyBlue[900]}`,
            backgroundColor: slate[900],
          },
        }}
        onClick={handleClick}
        icon={level === 0 ? icon : undefined}
        title={title}
        isShowEndAdornment={menuItems.length > 0 && level < 2}
        selected={isMenuSelected}
      />

      {menuItems.length > 0 && (
        <OpenDrawerCollapse in={isMenuSelected}>
          <List component="div" disablePadding>
            {menuItems.map((subMenuItem) => (
              <MenuItemRecursive
                key={subMenuItem.key}
                menuItem={subMenuItem}
                level={level + 1}
                parentPath={currentPath}
                subMenusOpen={subMenusOpen}
                setSubMenusOpen={setSubMenusOpen}
                currentPathMenuOpen={currentPathMenuOpen}
              />
            ))}
          </List>
        </OpenDrawerCollapse>
      )}
    </Box>
  );
};

export const OpenDrawerMenuItemList = ({
  menuItems,
  currentPathname,
}: OpenDrawerMenuItemListProps) => {
  const [subMenusOpen, setSubMenusOpen] = useState<NestedMenuState>({});

  const [currentPathMenuOpen, setCurrentPathMenuOpen] =
    useState<NestedMenuState>({});

  useEffect(() => {
    const obj = urlToNestedObject(currentPathname);

    if (_isEmpty(obj)) {
      setSubMenusOpen({ home: true });
      setCurrentPathMenuOpen({ home: true });

      return;
    }

    setSubMenusOpen(obj);
    setCurrentPathMenuOpen(obj);
  }, [currentPathname]);

  return menuItems.map((menuItem) => (
    <MenuItemRecursive
      key={menuItem.key}
      menuItem={menuItem}
      subMenusOpen={subMenusOpen}
      setSubMenusOpen={setSubMenusOpen}
      currentPathMenuOpen={currentPathMenuOpen}
    />
  ));
};
