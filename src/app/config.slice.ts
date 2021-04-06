import { createSlice, createSelector } from '@reduxjs/toolkit';
import { matchPath } from 'react-router-dom';

import config, { Menu } from 'src/config';
import { AppState } from './store';

export interface State {
  menus?: Menu[];
  breadcrumbs?: Record<string, string>;
  authority?: Record<string, string | string[]>;
}

export const initialState: State = {
  menus: config.menus || [],
  breadcrumbs: config.breadcrumbs || {},
  authority: config.authority || {},
};

const slice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
});

export default slice.reducer;

/** 导航目录 */
export const selectMenus = createSelector(
  (state: AppState) => state.config.menus || [],
  (state: AppState) => state.config.authority || {},
  (state: AppState) => state.authority || [],
  getMenusWithAuthority
);

/** 目录扁平化 */
export const selectFlatMenus = createSelector(
  (state: AppState) => state.config.menus || [],
  getFlatMenus
);

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
  return createSelector(
    (state: AppState) => state.config.breadcrumbs || {},
    (breadcrumbs) => getBreadcrumbs(breadcrumbs, pathname)
  );
};

/** 用户是否有权限 */
export const selectHasAuthority = (pathname: string) => {
  return createSelector(
    (state: AppState) => state.config.authority || {},
    (state: AppState) => state.authority || {},
    (authorityMap, userAuthorityList) => {
      return hasAuthority(
        getAuthorityFromEntries(authorityMap, pathname),
        userAuthorityList
      );
    }
  );
};

/** utils */
type FlatMenus = Record<string, Menu>;

/**
 * 验证是否拥有某个/某些权限
 *
 * 可能会根据后端做具体调整
 *
 * @param authority 待验证的权限
 * @param authorities 所有权限
 */
function hasAuthority(
  authority: string | string[] = '',
  authorities: string[]
): boolean {
  if (!authority) {
    // 第一个参数不传时，不进行权限验证，返回 true
    return true;
  }
  const authForTest = !Array.isArray(authority) ? [authority] : authority;
  return authForTest.some((t) => authorities.includes(t));
}

function getAuthorityFromEntries(
  entries: Record<string, string | string[]>,
  pathname: string
): string | string[] {
  let authority: string | string[] = '';
  Object.keys(entries).forEach((path) => {
    if (matchPath({ path, end: true }, pathname)) {
      authority = entries[path];
    }
  });
  return authority;
}

/**
 * 根据权限构造新的 menu
 *
 * @param menuData
 * @param authority
 * @returns
 */
function getMenusWithAuthority(
  menuData: Menu[] = [],
  authorityMap: Record<string, string | string[]>,
  authorities: string[]
): Menu[] {
  return menuData.reduce<Menu[]>((result, current) => {
    const { children, ...rest } = current;
    let menu: Menu | null = null;
    let authority = getAuthorityFromEntries(authorityMap, current.path);

    if (hasAuthority(authority, authorities)) {
      menu = {
        children: getMenusWithAuthority(children, authorityMap, authorities),
        ...rest,
      };
    }

    if (menu) {
      return result.concat(menu);
    }

    return result;
  }, []);
}

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
