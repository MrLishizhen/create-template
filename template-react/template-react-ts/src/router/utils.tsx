import { RouteObject } from 'react-router';
import { RoutesType } from '@/redux/slice-reducer/routes';
import LazyView from './route';
const VITE_APP_AUTH = import.meta.env.VITE_APP_AUTH;

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

// 获取sessionStorage
export const get_sessionStorage = (key: string) => {
  return sessionStorage.getItem(key) || '';
};

// 删除sessionStorage
export const remove_sessionStorage = (key: string): void => {
  sessionStorage.removeItem(key);
};

// 设置sessionStorage
export const set_sessionStorage = <T,>(key: string, value: T): void => {
  // 如果值是对象，需要转换为字符串
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  sessionStorage.setItem(key, stringValue);
};

// 鉴权
export const auth = () => {
  const user = get_sessionStorage(VITE_APP_AUTH);
  if (!user) {
    return false;
  }
  return true;
};
