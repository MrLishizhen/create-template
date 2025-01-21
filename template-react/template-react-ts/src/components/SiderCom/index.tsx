import { Layout } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router';
import styles from './index.module.less';
import { useAppSelector } from '@/redux/hook';
import { useEffect, useState } from 'react';
import { MenuCom } from '../antd';
import { IconFont } from '@/components/ui';
import { generateTree } from './utils';
import { RoutesType } from '@/redux/slice-reducer/routes';
import { get_sessionStorage } from '@/router/utils';
type MenuItem = Required<MenuProps>['items'][number];

const VITE_APP_ROUTERLAYOUT = import.meta.env.VITE_APP_ROUTERLAYOUT;
const { Sider } = Layout;

type SiderComProps = {
  collapsed: boolean;
};
const SiderCom = (props: SiderComProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const routesSlice = useAppSelector(state => state.routesSlice.routes);
  const { collapsed } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]); //默认选中
  const [openKeys, setOpenKeys] = useState<string[]>([]); //默认展开

  const [menu, setMenu] = useState<MenuItem[]>([]);

  const customizer = (item: RoutesType): MenuItem => {
    const { meta } = item;
    const { hideMenu } = meta;
    if (hideMenu) {
      return null;
    }
    return {
      key: item.link,
      label: item.meta.title,
      icon: item.icon ? <IconFont type={item.icon} /> : null,
    };
  };

  const handleKeys = (path: string) => {
    const params_values = Object.values(params);
    let pathArr = [];

    pathArr = path
      .replace(VITE_APP_ROUTERLAYOUT, '')
      .split('/')
      .filter(u => !params_values.includes(u));

    let keys = pathArr.at(-1);

    const route = routesSlice.find(u => u.link.includes(keys as string));

    if (route) {
      const { meta } = route;
      const { parentMenu } = meta;
      if (parentMenu) {
        pathArr = parentMenu?.split('/');
        console.log(pathArr, 111);
        keys = pathArr.at(-1);
      }
    }
    pathArr.pop();
    setOpenKeys(pathArr.filter(u => u));
    setSelectedKeys([keys!]);
  };

  const openChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };
  useEffect(() => {
    const { pathname } = location;
    const menuItems = generateTree<RoutesType, MenuItem>({
      data: routesSlice,
      parentId: 0,
      customizer,
    });
    //初始化 默认选中
    const path = get_sessionStorage('initPath');
    if (pathname === path) {
      handleKeys(path);
    } else {
      handleKeys(pathname);
    }

    setMenu(menuItems);
  }, [routesSlice, location]);

  return (
    <Sider className={styles.sider} width={240} trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logo}></div>
      <MenuCom
        onClick={({ keyPath }) => {
          setSelectedKeys(keyPath);
          navigate(`${VITE_APP_ROUTERLAYOUT}/${keyPath.reverse().join('/')}`);
        }}
        onOpenChange={openChange}
        openKeys={openKeys}
        selectedKeys={[...selectedKeys]}
        theme='dark'
        mode='inline'
        items={menu}
      ></MenuCom>
    </Sider>
  );
};

export default SiderCom;
