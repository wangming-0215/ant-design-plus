import React from 'react';
import { useRoutes } from 'react-router-dom';

import routes from 'src/routes';
import PageLoading from 'src/components/PageLoading';
import Splash from 'src/components/Splash';

function App() {
  const element = useRoutes(routes);
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Splash>{element}</Splash>
    </React.Suspense>
  );
}

export default App;
