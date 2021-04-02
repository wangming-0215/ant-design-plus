import { Layout } from 'antd';
import styled from '@emotion/styled';

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

const Header = styled(Layout.Header)<HeaderRootProps>((props) => ({
  backgroundColor: getThemeColor(props.color),
  height: props.height || 48,
}));

export default Header;
