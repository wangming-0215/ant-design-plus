import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

import Header from './Header';
import SideBar from './SideBar';
import Content from './Content';

const LayoutRoot = styled(Layout)({
  height: '100%',
  overflow: 'hidden',
});

const MainLayout: React.FC = () => {
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
