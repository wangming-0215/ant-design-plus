import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoAsset } from 'src/assets/logo.svg';

const LogoRoot = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <LogoRoot>
        <LogoAsset width={32} height={32} />
      </LogoRoot>
    </Link>
  );
};

export default Logo;
