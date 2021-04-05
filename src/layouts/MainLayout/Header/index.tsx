import { Layout, Space, Avatar } from 'antd';
import styled from '@emotion/styled';

import Logo from './Logo';
import Breadcrumbs from './Breadcrumbs';

export interface HeaderRootProps {
  color?: 'dark' | 'light';
  height?: string | number;
}

function getThemeColor(color: 'dark' | 'light' = 'light'): string {
  const colorMap = {
    light: '#fff',
    dark: '#001529',
  };
  return colorMap[color];
}

const HeaderRoot = styled(Layout.Header)<HeaderRootProps>((props) => ({
  backgroundColor: getThemeColor(props.color),
  height: props.height || 48,
  lineHeight: `${props.height || 48}px`,
  paddingLeft: 16,
  paddingRight: 16,
  display: 'flex',
  alignItems: 'center',
}));

const Expand = styled('div')({
  flex: 1,
});

const Header: React.FC = () => {
  return (
    <HeaderRoot>
      <Space size="large">
        <Logo />
        <Breadcrumbs />
      </Space>
      <Expand />
      <div>
        <Avatar />
      </div>
    </HeaderRoot>
  );
};

export default Header;
