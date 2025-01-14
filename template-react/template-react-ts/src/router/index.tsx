import { useRoutes, Navigate } from 'react-router';
import { Suspense, useMemo, useEffect } from 'react';
import { getMenuList } from '@/redux/slice-reducer/routes';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import LayoutView from '@/layout';
import Login from '@/views/login';
import EmptyView from '@/views/empty';
import { get_routers } from './utils';

const LAYOUT = import.meta.env.VITE_APP_ROUTERLAYOUT;

const RouterView = () => {
  const dispatch = useAppDispatch();
  const routesSlice = useAppSelector(state => {
    return state.routesSlice.routes;
  });

  // 获取路由列表
  useEffect(() => {
    if (routesSlice.length === 0) {
      dispatch(getMenuList({ userName: 'admin' }));
    }
  }, [routesSlice, dispatch]);

  // 生成children路由对象
  const routers = useMemo(() => get_routers(routesSlice), [routesSlice]);

  // 处理访问/时，跳转默认路由
  const handleRouters = [];
  if (routers.length > 0) {
    const [router] = routers;
    const { path } = router;
    handleRouters.push({
      path: '/',
      element: <Navigate to={`${LAYOUT}/${path}`} />,
    });
  }

  // 生成路由对象
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

  return <Suspense fallback={'加载中。。。'}>{routesSlice.length === 0 ? '' : router}</Suspense>;
};

export default RouterView;
