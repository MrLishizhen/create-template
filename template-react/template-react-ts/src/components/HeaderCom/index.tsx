import styles from './index.module.less';
import { Layout, Button, theme, Breadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { userState, handleUserInfo } from '@/redux/slice-reducer/user';
const { Header } = Layout;
const VITE_APP_ROUTERLAYOUT = import.meta.env.VITE_APP_ROUTERLAYOUT;
type HeaderComProps = {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
};

const HeaderCom = (props: HeaderComProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const routesSlice = useAppSelector(state => state.routesSlice.routes);
  const { pathname } = useLocation();
  const { collapsed, setCollapsed } = props;
  const userInfo = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<BreadcrumbProps['items']>([]);

  useEffect(() => {
    const pathArr = pathname
      .replace(VITE_APP_ROUTERLAYOUT, '')
      .split('/')
      .filter(u => u);

    const result: BreadcrumbProps['items'] = [];
    pathArr.forEach(item => {
      const route = routesSlice.find(u => u.link.includes(item));
      if (route) {
        // const { meta } = route;
        // if (meta.parentMenu) {
        //   const parentMenu = routesSlice.find(u => u.link.includes(meta.parentMenu as string));
        //   if (parentMenu) {
        //     result.push({
        //       title: parentMenu.meta.title,
        //     });
        //   }
        // }
        result.push({
          title: route.meta.title,
        });
      }
    });

    setItems(result);
  }, [pathname, routesSlice]);
  useEffect(() => {
    if (!userInfo) {
      dispatch(handleUserInfo());
    }
  }, [userInfo, dispatch]);

  return (
    <Header className={styles.header} style={{ padding: 0, background: colorBgContainer }}>
      <div className={styles.header_left}>
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <Breadcrumb style={{ marginLeft: '10px' }} items={items} />
      </div>
      <div className={styles.header_right}>
        <span className={styles.name}>{userInfo?.name ? `欢迎 ${userInfo?.name}` : ''} </span>
        <ul className={styles.header_right_ul}>
          <li>退出登陆</li>
        </ul>
      </div>
    </Header>
  );
};

export default HeaderCom;
