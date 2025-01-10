import styles from './index.module.less';
import { Button, Result } from 'antd';
import type { ResultProps } from 'antd';

const EmptyView = (props: ResultProps) => {
  const {
    status = '404',
    title = '404',
    subTitle = '对不起，您访问的页面不存在。',
    extra,
    ...rest
  } = props;

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={extra || <Button type='primary'>返回首页</Button>}
      {...rest}
      className={styles.empty}
    />
  );
};

export default EmptyView;
