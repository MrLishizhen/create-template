import { useRoutes, Navigate, useLocation, useNavigate } from 'react-router';
import type { RouteObject } from 'react-router';
import { useMemo, useEffect } from 'react';
import { Button } from 'antd';
import { getMenuList } from '@/redux/slice-reducer/routes';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import LayoutView from '@/layout';
import Login from '@/views/login';
import EmptyView from '@/views/empty';
import {
  get_routers,
  auth,
  set_sessionStorage,
  get_sessionStorage,
  remove_sessionStorage,
} from './utils';

const LAYOUT = import.meta.env.VITE_APP_ROUTERLAYOUT;
const LOGIN = import.meta.env.VITE_APP_LOGIN;
const VITE_APP_AUTH = import.meta.env.VITE_APP_AUTH;

const RouterView = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const routesSlice = useAppSelector(state => {
    return state.routesSlice.routes;
  });
  const init = useAppSelector(state => {
    return state.routesSlice.init;
  });

  // 判断是否登陆
  useEffect(() => {
    if (pathname === LOGIN) {
      return;
    } else {
      if (!auth()) {
        navigate(LOGIN, { replace: true });
      }
    }
  }, [pathname, navigate]);

  // 获取路由列表
  useEffect(() => {
    const token = get_sessionStorage(VITE_APP_AUTH);
    if (token) {
      if (init) {
        dispatch(getMenuList());
      }
    } else {
      navigate(LOGIN, { replace: true });
    }
  }, [init, dispatch, navigate]);

  // 生成children路由对象
  const routers = useMemo(() => {
    const routerArr = get_routers(routesSlice);
    //处理没有任何权限的特殊情况
    if (routerArr.length === 0) {
      return [];
    } else {
      return routerArr;
    }
  }, [routesSlice]);

  const firstPath = (data: RouteObject) => {
    const result: React.Key[] = [];
    function recursion(item: RouteObject) {
      result.push(item?.path || '');
      if (item.children && item.children.length > 0) {
        recursion(item.children[0]);
      }
    }
    recursion(data);
    return result;
  };

  // 处理访问/时，跳转默认路由
  const handleRouters = [];
  if (routers.length > 0) {
    const [router] = routers;
    const path = firstPath(router);
    const initPath = path.filter(item => item).join('/');
    set_sessionStorage('initPath', initPath);
    handleRouters.push({
      path: '/',
      element: <Navigate to={`${LAYOUT}/${initPath}`} />,
    });
  } else {
    handleRouters.push({
      path: '/',
      element: <Navigate to={`/403`} />,
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
      path: '403',
      element: (
        <EmptyView
          status={403}
          title={403}
          subTitle={'很抱歉，你好像没有任何权限！'}
          extra={
            <Button
              type='primary'
              onClick={() => {
                remove_sessionStorage(VITE_APP_AUTH);
                navigate(LOGIN, { replace: true });
              }}
            >
              返回登陆页
            </Button>
          }
        />
      ),
    },
    {
      path: LAYOUT,
      element: <LayoutView />,
      children: routers,
    },
  ]);
  return init && pathname !== LOGIN ? '' : router;
};

export default RouterView;
