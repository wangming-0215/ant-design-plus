import styled from '@emotion/styled';
import { Layout } from 'antd';

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
  return (
    <ContentRoot>
      <Wrapper>
        <div>{children}</div>
      </Wrapper>
    </ContentRoot>
  );
};

export default Content;
