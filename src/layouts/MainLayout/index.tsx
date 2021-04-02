import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
