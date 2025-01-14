import styles from './index.module.less';
import { useNavigate } from 'react-router';
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

  const navigate = useNavigate();
  return (
    <div>
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={
          extra || (
            <Button
              type='primary'
              onClick={() => {
                navigate('/', { replace: true });
              }}
            >
              返回首页
            </Button>
          )
        }
        {...rest}
        className={styles.empty}
      />
    </div>
  );
};

export default EmptyView;
