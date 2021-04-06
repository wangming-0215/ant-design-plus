import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authService } from 'src/services';
import { sleep } from 'src/utils';
import PageLoading from '../PageLoading';

const Auth: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      authService.authentication();
      await sleep(3000);
      if (authService.isAuthenticated()) {
        // TODO: Fetch user profile and user authorities
      } else {
        navigate('/login', { replace: true });
      }
      setLoading(false);
    };

    init();
  }, [navigate]);

  if (loading) {
    return <PageLoading />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Auth;
