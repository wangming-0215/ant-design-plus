import { createSlice, createSelector } from '@reduxjs/toolkit';
import { matchPath } from 'react-router-dom';

import menus, { Menu } from 'src/config/menu';
import { AppState } from 'src/app/store';

export type State = Menu[];

const initialState: State = menus;

const slice = createSlice({
  name: 'menus',
  initialState,
  reducers: {},
});

export default slice.reducer;

/** 原始 menu 数据 */
export const selectMenuData = (state: AppState) => state.menu;

/** 扁平化 menu */
export const selectFlatMenu = createSelector(selectMenuData, getFlatMenus);

/** 当前所在 menu */
export const selectMatchedMenu = (pathname: string) => {
  return createSelector(selectFlatMenu, (flattedMenus) =>
    getMatchedMenu(flattedMenus, pathname)
  );
};

/** 侧边栏展开的 menu */
export const selectOpenedKeys = (pathname: string) => {
  return createSelector(selectFlatMenu, (flattedMenus) => {
    const allMatchedKeys = getMatchedMenu(flattedMenus, pathname, true);
    return [allMatchedKeys[0]].filter((t) => t);
  });
};

/** 拆分 menu 时，侧边栏渲染的子级 menu */
export const selectChildMenu = (pathname: string) => {
  return createSelector(
    selectFlatMenu,
    selectMatchedMenu(pathname),
    getChildMenu
  );
};

export type FlattedMenu = Record<string, Menu>;

/**
 * 扁平化 menu
 *
 * @param menuData
 * @returns
 */
function getFlatMenus(menuData: Menu[]): FlattedMenu {
  let flattedMenus: FlattedMenu = {};

  menuData.forEach((item) => {
    if (!item) {
      return;
    }
    flattedMenus[item.path] = { ...item };
    if (item.children && item.children.length > 0) {
      flattedMenus = { ...flattedMenus, ...getFlatMenus(item.children) };
    }
  });

  return flattedMenus;
}

/**
 * 当前所在路由
 *
 * @param flattedMenus
 * @param pathname
 * @returns
 */
function getMatchedMenu(
  flattedMenus: FlattedMenu,
  pathname: string = '/',
  fullKey: boolean = false
): string[] {
  const matched = Object.keys(flattedMenus)
    .filter((path) => matchPath({ path, end: false }, pathname))
    .sort((a, b) => {
      if (a === pathname) {
        return 10;
      }
      if (b === pathname) {
        return -10;
      }
      return a.substr(1).split('/').length - b.substr(1).split('/').length;
    });

  if (!fullKey) {
    return [matched[matched.length - 1]].filter((t) => t);
  }

  return matched;
}

/**
 * 获取子级目录
 *
 * 目录拆分时，侧边栏需要渲染的目录
 *
 * @param flattedMenus
 * @param matchedPath
 * @returns
 */
function getChildMenu(
  flattedMenus: FlattedMenu,
  matchedPath: string[]
): Menu[] | null | undefined {
  const [key] = matchedPath;
  if (!key) return null;

  return flattedMenus[key]?.children;
}
