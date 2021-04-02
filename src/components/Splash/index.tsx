import styled from '@emotion/styled';
import { Spin } from 'antd';

const SplashRoot = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Splash = () => {
  return (
    <SplashRoot>
      <Spin spinning size="large" />
    </SplashRoot>
  );
};

export default Splash;
