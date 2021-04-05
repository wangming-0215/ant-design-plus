import React from 'react';
import { useRoutes } from 'react-router-dom';

import routes from 'src/routes';

function App() {
  const element = useRoutes(routes);
  return (
    <React.Suspense fallback={<div>Loading...</div>}>{element}</React.Suspense>
  );
}

export default App;
