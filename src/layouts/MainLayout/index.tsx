import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

import { useAppSelector } from 'src/hooks';
import { selectMenus } from 'src/app/config.slice';
import Header from './Header';
import SideBar from './SideBar';
import Content from './Content';

const LayoutRoot = styled(Layout)({
  height: '100%',
  overflow: 'hidden',
});

const MainLayout: React.FC = () => {
  const menus = useAppSelector(selectMenus);
  console.log(menus);
  return (
    <LayoutRoot>
      <Header />
      <Layout>
        <SideBar>Sider</SideBar>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </LayoutRoot>
  );
};

export default MainLayout;
