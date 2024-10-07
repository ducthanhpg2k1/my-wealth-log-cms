/* eslint-disable unicorn/consistent-function-scoping */
import { Form, Space } from 'antd';
import { useRouter } from 'next/router';

import Button from '@components/UI/Button/Button';
import InputText, { PasswordInput } from '@components/UI/InputText';
import Text from '@components/UI/Text';
import { setAuthCookies } from '@store/auth';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { openNotification, ROUTE_PATH } from '@utils/common';

import styles from './index.module.scss';
import { useLoginUserName } from './service';

const SignIn = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { requestGetProfile } = useProfileInitial();

  const requestLogin = useLoginUserName({
    onSuccess: (res: any) => {
      setAuthCookies({
        token: `${res?.data.accessToken}`,
      });
      router.push(ROUTE_PATH.USER);
      openNotification('Login successfully', 'success');
      requestGetProfile();
    },
    onError(e) {
      openNotification(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const onSubmit = (values: any) => {
    const body = {
      username: values?.username,
      password: values?.password,
    };
    requestLogin.run(body);
  };
  return (
    <div className={styles.container}>
      <Form form={form} layout='vertical' onFinish={onSubmit}>
        <Space style={{ width: '100%' }} direction='vertical' size={40}>
          <Space direction='vertical' size={12}>
            <Text color='text-primary' type='font-24-700'>
              Xin chào!
            </Text>
            <Text color='neutral-700' type='font-14-400'>
              Vui lòng đăng nhập để tiểp tục
            </Text>
          </Space>
          <div>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập',
                },
              ]}
              name='username'
              label={'Tên đăng nhập'}
            >
              <InputText size='large' placeholder='Tên đăng nhập' />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu',
                },
              ]}
              name='password'
              label={'Mật khẩu'}
            >
              <PasswordInput size='large' placeholder='Mật khẩu' />
            </Form.Item>
            <Button
              loading={requestLogin?.loading}
              htmlType='submit'
              className={styles.btnLogin}
              type='green'
            >
              Đăng nhập
            </Button>
          </div>
        </Space>
      </Form>
    </div>
  );
};
export default SignIn;
