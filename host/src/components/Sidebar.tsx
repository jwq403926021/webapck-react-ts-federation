import * as React from 'react';
import {styled} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Tooltip from '@mui/material/Tooltip';
import type {} from '@mui/material/themeCssVarsAugmentation';
import type {Theme} from '@mui/material/styles';
import {Link, useLocation} from "react-router-dom";
import {pathToRegexp} from "path-to-regexp";
export interface NavigationPageItem {
  kind?: 'page';
  segment?: string;
  title?: string;
  icon?: React.ReactNode;
  pattern?: string;
  action?: React.ReactNode;
  children?: Navigation;
}
export interface NavigationSubheaderItem {
  kind: 'header';
  title: string;
}
export interface NavigationDividerItem {
  kind: 'divider';
}
export interface DashboardSidebarSubNavigationProps {
  subNavigation: Navigation;
  basePath?: string;
  depth?: number;
  onLinkClick: () => void;
  isMini?: boolean;
  isFullyExpanded?: boolean;
  hasDrawerTransitions?: boolean;
  selectedItemId: string;
}

export type NavigationItem = NavigationPageItem | NavigationSubheaderItem | NavigationDividerItem;
export type Navigation = NavigationItem[]

export const getItemKind = (item: NavigationItem) => item.kind ?? 'page';
export const isPageItem = (item: NavigationItem): item is NavigationPageItem => getItemKind(item) === 'page';
export const getItemTitle = (item: NavigationPageItem | NavigationSubheaderItem) => {
  return isPageItem(item) ? (item.title ?? item.segment ?? '') : item.title;
};
export function getPageItemFullPath(basePath: string, navigationItem: NavigationPageItem) {
  return `${basePath}${basePath && !navigationItem.segment ? '' : '/'}${navigationItem.segment ?? ''}`;
}
export function isPageItemSelected(
  navigationItem: NavigationPageItem,
  basePath: string,
  pathname: string,
) {
  return navigationItem.pattern
    ? pathToRegexp(`${basePath}/${navigationItem.pattern}`).regexp.test(pathname)
    : getPageItemFullPath(basePath, navigationItem) === pathname;
}

export function hasSelectedNavigationChildren(
  navigationItem: NavigationItem,
  basePath: string,
  pathname: string,
): boolean {
  if (isPageItem(navigationItem) && navigationItem.children) {
    const navigationItemFullPath = getPageItemFullPath(basePath, navigationItem);

    return navigationItem.children.some((nestedNavigationItem) => {
      if (!isPageItem(nestedNavigationItem)) {
        return false;
      }

      if (nestedNavigationItem.children) {
        return hasSelectedNavigationChildren(
          nestedNavigationItem,
          navigationItemFullPath,
          pathname,
        );
      }

      return isPageItemSelected(nestedNavigationItem, navigationItemFullPath, pathname);
    });
  }

  return false;
}

export function getDrawerSxTransitionMixin(isExpanded: boolean, property: string) {
  return {
    transition: (theme: Theme) =>
      theme.transitions.create(property, {
        easing: theme.transitions.easing.sharp,
        duration: isExpanded
          ? theme.transitions.duration.enteringScreen
          : theme.transitions.duration.leavingScreen,
      }),
  };
}

const NavigationListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  '&.Mui-selected': {
    '& .MuiListItemIcon-root': {
      color: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiTypography-root': {
      color: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiSvgIcon-root': {
      color: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiAvatar-root': {
      backgroundColor: (theme.vars ?? theme).palette.primary.dark,
    },
    '& .MuiTouchRipple-child': {
      backgroundColor: (theme.vars ?? theme).palette.primary.dark,
    },
  },
  '& .MuiSvgIcon-root': {
    color: (theme.vars ?? theme).palette.action.active,
  },
  '& .MuiAvatar-root': {
    backgroundColor: (theme.vars ?? theme).palette.action.active,
  },
}));

function DashboardSidebarSubNavigation({
                                         subNavigation,
                                         basePath = '',
                                         depth = 0,
                                         onLinkClick,
                                         isMini = false,
                                         isFullyExpanded = true,
                                         hasDrawerTransitions = false,
                                         selectedItemId,
                                       }: DashboardSidebarSubNavigationProps) {

  const {pathname} = useLocation();

  const initialExpandedSidebarItemIds = React.useMemo(
    () =>
      subNavigation
        .map((navigationItem, navigationItemIndex) => ({
          navigationItem,
          originalIndex: navigationItemIndex,
        }))
        .filter(({ navigationItem }) =>
          hasSelectedNavigationChildren(navigationItem, basePath, pathname),
        )
        .map(({ originalIndex }) => `${depth}-${originalIndex}`),
    [basePath, depth, pathname, subNavigation],
  );

  const [expandedSidebarItemIds, setExpandedSidebarItemIds] = React.useState(
    initialExpandedSidebarItemIds,
  );

  const handleOpenFolderClick = React.useCallback(
    (itemId: string) => () => {
      setExpandedSidebarItemIds((previousValue) =>
        previousValue.includes(itemId)
          ? previousValue.filter((previousValueItemId) => previousValueItemId !== itemId)
          : [...previousValue, itemId],
      );
    },
    [],
  );

  return (
    <List sx={{ padding: 0, mb: depth === 0 ? 4 : 1, pl: 2 * depth }}>
      {subNavigation.map((navigationItem, navigationItemIndex) => {
        if (navigationItem.kind === 'header') {
          return (
            <ListSubheader
              key={`subheader-${depth}-${navigationItemIndex}`}
              component="div"
              sx={{
                fontSize: 12,
                fontWeight: '700',
                height: isMini ? 0 : 40,
                ...(hasDrawerTransitions
                  ? getDrawerSxTransitionMixin(isFullyExpanded, 'height')
                  : {}),
                px: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                zIndex: 2,
              }}
            >
              {getItemTitle(navigationItem)}
            </ListSubheader>
          );
        }

        if (navigationItem.kind === 'divider') {
          const nextItem = subNavigation[navigationItemIndex + 1];

          return (
            <Divider
              key={`divider-${depth}-${navigationItemIndex}`}
              sx={{
                borderBottomWidth: 2,
                mx: 1,
                mt: 1,
                mb: nextItem?.kind === 'header' && !isMini ? 0 : 1,
                ...(hasDrawerTransitions
                  ? getDrawerSxTransitionMixin(isFullyExpanded, 'margin')
                  : {}),
              }}
            />
          );
        }

        const navigationItemFullPath = getPageItemFullPath(basePath, navigationItem);
        const navigationItemId = `${depth}-${navigationItemIndex}`;
        const navigationItemTitle = getItemTitle(navigationItem);

        const isNestedNavigationExpanded = expandedSidebarItemIds.includes(navigationItemId);

        const nestedNavigationCollapseIcon = isNestedNavigationExpanded ? (
          '-'
        ) : (
          '+'
        );

        const listItemIconSize = 34;

        const isSelected = isPageItemSelected(navigationItem, basePath, pathname);
        if (process.env.NODE_ENV !== 'production' && isSelected && selectedItemId) {
          console.warn(`Duplicate selected path in navigation: ${navigationItemFullPath}`);
        }

        if (isSelected && !selectedItemId) {
          selectedItemId = navigationItemId;
        }

        const listItem = (
          <ListItem
            sx={{
              py: 0,
              px: 1,
              overflowX: 'hidden',
            }}
          >
            <NavigationListItemButton
              selected={isSelected && (!navigationItem.children || isMini)}
              sx={{
                px: 1.4,
                height: 48,
              }}
              {...(navigationItem.children && !isMini
                ? {
                  onClick: handleOpenFolderClick(navigationItemId),
                }
                : {
                  LinkComponent: Link,
                  to: navigationItemFullPath,
                  onClick: onLinkClick,
                })}
            >
              {navigationItem.icon || isMini ? (
                <ListItemIcon
                  sx={{
                    minWidth: listItemIconSize,
                    mr: 1.2,
                  }}
                >
                  {navigationItem.icon ?? null}
                  {!navigationItem.icon && isMini ? (
                    <Avatar
                      sx={{
                        width: listItemIconSize - 7,
                        height: listItemIconSize - 7,
                        fontSize: 12,
                        ml: '-2px',
                      }}
                    >
                      {navigationItemTitle
                        .split(' ')
                        .slice(0, 2)
                        .map((itemTitleWord) => itemTitleWord.charAt(0).toUpperCase())}
                    </Avatar>
                  ) : null}
                </ListItemIcon>
              ) : null}
              <ListItemText
                primary={navigationItemTitle}
                sx={{
                  whiteSpace: 'nowrap',
                  zIndex: 1,
                  '& .MuiTypography-root': {
                    fontWeight: '500',
                  },
                }}
              />
              {navigationItem.action && !isMini && isFullyExpanded ? navigationItem.action : null}
              {navigationItem.children && !isMini && isFullyExpanded
                ? nestedNavigationCollapseIcon
                : null}
            </NavigationListItemButton>
          </ListItem>
        );

        return (
          <React.Fragment key={navigationItemId}>
            {isMini ? (
              <Tooltip title={navigationItemTitle} placement="right">
                {listItem}
              </Tooltip>
            ) : (
              listItem
            )}

            {navigationItem.children && !isMini ? (
              <Collapse in={isNestedNavigationExpanded} timeout="auto" unmountOnExit>
                <DashboardSidebarSubNavigation
                  subNavigation={navigationItem.children}
                  basePath={navigationItemFullPath}
                  depth={depth + 1}
                  onLinkClick={onLinkClick}
                  selectedItemId={selectedItemId}
                />
              </Collapse>
            ) : null}
          </React.Fragment>
        );
      })}
    </List>
  );
}

export { DashboardSidebarSubNavigation };