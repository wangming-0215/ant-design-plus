import { useRoutes } from 'react-router-dom';

import routes from 'src/routes';
import Auth from 'src/components/Auth';

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
