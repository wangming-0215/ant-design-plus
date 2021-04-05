import { createSlice, createSelector } from '@reduxjs/toolkit';
import { matchPath } from 'react-router-dom';

import { Menu, breadcrumbs, menus } from 'src/config';
import { AppState } from './store';

export interface State {
  menus: Menu[];
  breadcrumbs: Record<string, string>;
}

export const initialState: State = {
  menus,
  breadcrumbs,
};

const slice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
});

export default slice.reducer;

/** 导航目录 */
export const selectMenus = (state: AppState) => state.config.menus;

/** 面包屑字典 */
export const selectBreadcrumbs = (state: AppState) => state.config.breadcrumbs;

/** 目录扁平化 */
export const selectFlatMenus = createSelector(selectMenus, getFlatMenus);

/** 导航选中 */
export const selectMatchedMenu = (pathname: string) => {
  return createSelector(selectFlatMenus, (flatMenus) =>
    getMatchedMenu(flatMenus, pathname)
  );
};

/** 导航栏展开 */
export const selectOpenedMenu = (pathname: string) => {
  return createSelector(selectFlatMenus, (flatMenus) => {
    const matched = getMatchedMenu(flatMenus, pathname, true);
    return [matched[0]].filter((t) => t);
  });
};

/** 面包屑 */
export const selectCurrentBreadcrumbs = (pathname: string) => {
  return createSelector(selectBreadcrumbs, (breadcrumbs) =>
    getBreadcrumbs(breadcrumbs, pathname)
  );
};

/** utils */
type FlatMenus = Record<string, Menu>;

/**
 * 导航目录扁平化
 *
 * @param menuData menus
 * @returns
 */
function getFlatMenus(menuData: Menu[]): FlatMenus {
  let flatMenus: FlatMenus = {};

  menuData.forEach((menu) => {
    if (!menu) {
      return;
    }
    flatMenus[menu.path] = { ...menu };
    if (menu.children && menu.children.length > 0) {
      flatMenus = { ...flatMenus, ...getFlatMenus(menu.children) };
    }
  });

  return flatMenus;
}

/**
 * 当前匹配的路由
 *
 * @param flatMenus
 * @param pathname
 * @param fullKey
 * @returns
 */
function getMatchedMenu(
  flatMenus: FlatMenus,
  pathname: string,
  fullKey: boolean = false
): string[] {
  const matched = Object.keys(flatMenus)
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
 * 面包屑
 *
 * @param flattedMenus
 * @param pathname
 * @returns
 */
function getBreadcrumbs(
  breadcrumbsMap: Record<string, string>,
  pathname: string = '/'
): Record<'path' | 'title', string>[] {
  const breadcrumbs: Record<'path' | 'title', string>[] = [];

  pathname.split('/').reduce<string>((previous, current, index) => {
    const path = !current ? '/' : `${previous}/${current}`;
    if (path === '/' && index === 0) {
      return '';
    }
    const menu = Object.keys(breadcrumbsMap).find((key) =>
      matchPath({ path: key, end: true }, path)
    );
    if (menu) {
      breadcrumbs.push({ path, title: breadcrumbsMap[menu] });
    }
    return path === '/' ? '' : path;
  }, '');

  return breadcrumbs;
}