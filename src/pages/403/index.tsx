import styled from '@emotion/styled';

import { ReactComponent as SecureAsset } from 'src/assets/403.svg';

const NotFoundRoot = styled('div')({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const NotFound = () => {
  return (
    <NotFoundRoot>
      <SecureAsset width="30%" />
    </NotFoundRoot>
  );
};

export default NotFound;
