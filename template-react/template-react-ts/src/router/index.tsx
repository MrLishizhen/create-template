import { useRoutes } from 'react-router';
const RouterView = () => {
  const router = useRoutes([]);
  return <>{router}</>;
};

export default RouterView;
