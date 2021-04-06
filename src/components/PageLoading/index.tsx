import styled from '@emotion/styled';
import { Spin } from 'antd';

const PageLoadingRoot = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const PageLoading: React.FC = () => {
  return (
    <PageLoadingRoot>
      <Spin size="large" />
    </PageLoadingRoot>
  );
};

export default PageLoading;
