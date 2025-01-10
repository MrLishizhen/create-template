import { RouteObject } from 'react-router';
import { RoutesType } from '@/redux/slice-reducer/routes';
import LazyView from './route';
export const get_routers = (data: RoutesType[]) => {
  const buildRouteObject = (menu: RoutesType): RouteObject => {
    const { name, link } = menu;
    const children = data.filter(child => child.parentId === menu.id);

    // 构建当前路由对象
    const routeObject: RouteObject = {
      path: link,
      element: LazyView({ router_link: name }),
      // 如果有子路由，递归调用 buildRouteObject 来构建它们
      ...(children.length > 0 && { children: children.map(buildRouteObject) }),
    };

    return routeObject;
  };

  // 从顶级路由开始构建路由树
  return data.filter(menu => menu.parentId === 0).map(buildRouteObject);
};
