/* eslint-disable unicorn/consistent-function-scoping */
import { Form, Space } from 'antd';

import Button from '@components/UI/Button/Button';
import InputText, { PasswordInput } from '@components/UI/InputText';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

const SignIn = () => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    // eslint-disable-next-line no-console
    console.log(values);
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
            <Form.Item name='name' label={'Tên đăng nhập'}>
              <InputText size='large' placeholder='Tên đăng nhập' />
            </Form.Item>
            <Form.Item name='password' label={'Mật khẩu'}>
              <PasswordInput size='large' placeholder='Mật khẩu' />
            </Form.Item>
            <Button htmlType='submit' className={styles.btnLogin} type='green'>
              Đăng nhập
            </Button>
          </div>
        </Space>
      </Form>
    </div>
  );
};
export default SignIn;
