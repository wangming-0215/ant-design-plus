import styled from '@emotion/styled';

import { ReactComponent as NotFoundAsset } from 'src/assets/not-found.svg';

const NotFoundRoot = styled('div')({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const NotFoundIcon = styled(NotFoundAsset)({
  width: '30%',
});

const NotFound = () => {
  return (
    <NotFoundRoot>
      <NotFoundIcon />
    </NotFoundRoot>
  );
};

export default NotFound;
