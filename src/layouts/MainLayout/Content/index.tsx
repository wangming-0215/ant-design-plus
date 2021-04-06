import styled from '@emotion/styled';
import { Layout } from 'antd';
import { useLocation, Navigate } from 'react-router-dom';

import { selectHasAuthority } from 'src/app/config.slice';
import { useAppSelector } from 'src/hooks';

const ContentRoot = styled(Layout.Content)({
  overflow: 'hidden',
  height: '100%',
});

const Wrapper = styled('div')({
  overflow: 'auto',
  height: '100%',
  '& > div': {
    margin: 16,
  },
});

const Content: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const hasAuthority = useAppSelector(selectHasAuthority(pathname));

  if (!hasAuthority) {
    return <Navigate to="/403" replace />;
  }

  return (
    <ContentRoot>
      <Wrapper>
        <div>{children}</div>
      </Wrapper>
    </ContentRoot>
  );
};

export default Content;
