import { useRoutes, Navigate } from 'react-router';
import { Suspense, useMemo } from 'react';
import { useAppSelector } from '@/redux/hook';
import LayoutView from '@/layout';
import Login from '@/views/login';
import EmptyView from '@/views/empty';
import { get_routers } from './utils';

const LAYOUT = import.meta.env.VITE_APP_ROUTERLAYOUT;

const RouterView = () => {
  const routesSlice = useAppSelector(state => {
    return state.routesSlice.routes;
  });

  const routers = useMemo(() => get_routers(routesSlice), [routesSlice]);
  const handleRouters = [];
  if (routers.length > 0) {
    const [router] = routers;
    const { path } = router;
    handleRouters.push({
      path: '/',
      element: <Navigate to={`${LAYOUT}/${path}`} />,
    });
  }

  const router = useRoutes([
    ...handleRouters,
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/*',
      element: <EmptyView />,
    },
    {
      path: LAYOUT,
      element: <LayoutView />,
      children: routers,
    },
  ]);

  return <Suspense fallback={'加载中。。。'}>{router}</Suspense>;
};

export default RouterView;
