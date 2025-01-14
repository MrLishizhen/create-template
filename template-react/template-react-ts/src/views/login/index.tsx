import type { LoginProps } from '@/api/api';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './index.module.less';
import { Button, Checkbox, Form } from 'antd';
import { Search as SearchCom } from '@/components/ui';
import { set_sessionStorage } from '@/router/utils';

import { login } from '@/api/login';
const VITE_APP_AUTH = import.meta.env.VITE_APP_AUTH;
const LoginView = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // 处理记住密码回显
  useEffect(() => {
    const remember = localStorage.getItem('admin_remember');
    if (remember) {
      form.setFieldsValue({ ...JSON.parse(remember) });
    }
  }, [form]);

  // 处理记住密码
  const handleRemember = (values: LoginProps, key: 'add' | 'remove') => {
    if (key === 'add') {
      localStorage.setItem('admin_remember', JSON.stringify({ ...values, remember: true }));
    } else {
      localStorage.removeItem('admin_remember');
    }
  };

  const handleFormClick = () => {
    form
      .validateFields()
      .then(res => {
        const { remember, ...rest } = res;
        if (remember) {
          //处理记住密码
          handleRemember(rest, 'add');
        } else {
          handleRemember(rest, 'remove');
        }
        //处理登陆
        login(rest).then(res => {
          if (res.code === 200) {
            set_sessionStorage(VITE_APP_AUTH, res.result.token);

            navigate('/', { replace: true });
          }
        });
      })
      .catch(err => err);
  };
  return (
    <div className={styles.login}>
      <div className={styles.login_content}>
        <h1>欢迎来到admin系统</h1>
        <div className={styles.form}>
          <SearchCom
            col={1}
            fields={[
              {
                widget: 'input',
                label: '',
                colSpan: 1,
                widgetItemProps: {
                  name: 'name',
                  rules: [{ required: true, message: '请输入账号' }],
                },
                widgetProps: { placeholder: '请输入账号', autoComplete: 'off', size: 'large' },
              },
              {
                widget: 'password',
                label: '',
                colSpan: 1,
                widgetItemProps: {
                  name: 'password',
                  rules: [{ required: true, message: '请输入密码' }],
                },
                widgetProps: { placeholder: '请输入密码', autoComplete: 'off', size: 'large' },
              },
              {
                widget: 'button',
                label: '',
                colSpan: 1,
                widgetRender: () => {
                  return (
                    <div className={styles.additional}>
                      <Form.Item name='remember' style={{ margin: 0 }} valuePropName='checked'>
                        <Checkbox>记住密码</Checkbox>
                      </Form.Item>
                      <Button type='link' style={{ padding: 0 }}>
                        忘记密码
                      </Button>
                    </div>
                  );
                },
              },
            ]}
            formProps={{ form: form }}
          />
        </div>

        <Button onClick={handleFormClick} type='primary' block size='large'>
          登陆
        </Button>
      </div>
    </div>
  );
};

export default LoginView;
