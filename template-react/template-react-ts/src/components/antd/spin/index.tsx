import { Spin, SpinProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.less';
interface SpinComTypes {
  spin?: SpinProps;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const SpinCom = (props: SpinComTypes) => {
  const { spin = {}, children, style = {} } = props;

  return (
    <Spin
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      wrapperClassName={styles.wrapper}
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
      }
      {...spin}
    >
      {children}
    </Spin>
  );
};
