import { Layout } from 'antd';
import { Outlet, matchPath } from 'react-router-dom';
import styled from '@emotion/styled';

import Header from './Header';
import SideBar from './SideBar';
import Content from './Content';

const LayoutRoot = styled(Layout)({
  height: '100%',
  overflow: 'hidden',
});

const MainLayout: React.FC = () => {
  console.log(matchPath({ path: '/details/:id', end: false }, '/details/1'));
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
