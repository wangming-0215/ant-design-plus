import { Layout, Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';

import {
  selectMatchedMenu,
  selectMenus,
  selectOpenedMenu,
} from 'src/app/config.slice';
import { Menu as MenuItem } from 'src/config/menu';
import { useAppSelector } from 'src/hooks';

function getMenuItems(menuData: MenuItem[]): JSX.Element[] {
  return menuData.reduce<JSX.Element[]>((result, current) => {
    if (current.children) {
      return result.concat(
        <Menu.SubMenu key={current.path} title={current.name}>
          {getMenuItems(current.children)}
        </Menu.SubMenu>
      );
    }
    return result.concat(
      <Menu.Item key={current.path}>
        <Link to={current.path}>{current.name}</Link>
      </Menu.Item>
    );
  }, []);
}

const SideBar: React.FC = () => {
  const { pathname } = useLocation();
  const menuData = useAppSelector(selectMenus);
  const selectedKeys = useAppSelector(selectMatchedMenu(pathname));
  const openedKeys = useAppSelector(selectOpenedMenu(pathname));

  return (
    <Layout.Sider width={240}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={openedKeys}
      >
        {getMenuItems(menuData)}
      </Menu>
    </Layout.Sider>
  );
};

export default SideBar;
