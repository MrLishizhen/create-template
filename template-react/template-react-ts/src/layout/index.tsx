import { Suspense, useState } from 'react';
import { Outlet } from 'react-router';
import styles from './index.module.less';
import { Layout, theme } from 'antd';
import SiderCom from '@/components/SiderCom';
import HeaderCom from '@/components/HeaderCom';
const { Content } = Layout;

const LayoutView = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.layout}>
      <SiderCom collapsed={collapsed}></SiderCom>
      <Layout>
        <HeaderCom collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense fallback={'加载中。。。'}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutView;
