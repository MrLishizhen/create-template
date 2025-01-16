import { Layout } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router';
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
  const routesSlice = useAppSelector(state => state.routesSlice.routes);
  const { collapsed } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]); //默认选中
  const [openKeys, setOpenKeys] = useState<string[]>([]); //默认展开

  const [menu, setMenu] = useState<MenuItem[]>([]);

  const customizer = (item: RoutesType): MenuItem => {
    return {
      key: item.link,
      label: item.meta.title,
      icon: item.icon ? <IconFont type={item.icon} /> : null,
    };
  };

  const handleKeys = (path: string) => {
    const pathArr = path.split('/');
    const keys = pathArr.at(-1);
    pathArr.pop();
    setOpenKeys(pathArr);
    setSelectedKeys([keys!]);
  };

  const openChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };
  useEffect(() => {
    const menuItems = generateTree<RoutesType, MenuItem>({
      data: routesSlice,
      parentId: 0,
      customizer,
    });
    const path = get_sessionStorage('initPath');
    handleKeys(path);
    setMenu(menuItems);
  }, [routesSlice]);

  return (
    <Sider className={styles.sider} width={240} trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logo}></div>
      <MenuCom
        onClick={({ keyPath }) => {
          setSelectedKeys(keyPath);
          console.log(keyPath);
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
