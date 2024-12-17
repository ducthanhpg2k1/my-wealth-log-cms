import { useState } from 'react';

import { Form, Tabs } from 'antd';
import { TabsProps } from 'antd/lib';

import Button from '@components/UI/Button/Button';
import { openNotification } from '@utils/common';

import Feature from './Feature';
import FunctionPage from './FunctionPage';
import styles from './index.module.scss';
import Overview from './Overview';
import { useEditSetupLdpage, useGetConfigLdPage, useSetupLdpage } from './service';
import SettingBanner from './SettingBanner';
import UserManager from './UserManager';

const PageManagement = () => {
  const [form] = Form.useForm();
  const [defaultData, setDefaultData] = useState({});
  const { run } = useGetConfigLdPage({
    onSuccess: (res) => {
      form.setFieldsValue({
        ...res?.data?.content,
      });
      setDefaultData({
        ...res?.data?.content,
      });
    },
  });

  const itemsTab: TabsProps['items'] = [
    {
      label: 'Banner',
      key: 'banner',
      children: <SettingBanner form={form} />,
    },
    {
      label: 'Tổng quan',
      key: 'overview',
      children: <Overview form={form} />,
    },
    {
      label: 'Chức năng',
      key: 'function',
      children: <FunctionPage form={form} />,
    },
    {
      label: 'Tính năng nổi bật',
      key: 'feature',
      children: <Feature form={form} />,
    },
    {
      label: 'Đánh giá',
      key: 'evaluate',
      children: <UserManager form={form} />,
    },
  ];

  const requestSetupLdpage = useSetupLdpage({
    onSuccess: () => {
      openNotification('Set up langding page thành công', 'success');
      run();
    },
    onError() {},
  });
  const requestEditSetupLdpage = useEditSetupLdpage({
    onSuccess: () => {
      openNotification('Set up langding page thành công', 'success');
      run();
    },
    onError() {},
  });

  const onFinish = (values: any) => {
    const body = {
      content: {
        ...defaultData,
        ...values,
      },
    };

    requestSetupLdpage.run(body);
  };

  return (
    <Form
      name='dynamic_form_nest_item'
      onFinish={onFinish}
      form={form}
      initialValues={{
        banners: [
          {
            title: '',
            description: '',
            image: '',
            image_mobile: '',
            required: false,
            url_appstore: '',
            url_google: '',
          },
        ],
        overviews: [
          {
            title: '',
            description: '',
            image: '',
            required: false,
          },
        ],
        functions: [
          {
            title: '',
            description: '',
            image: '',
            required: false,
          },
        ],
        features: [
          {
            title: '',
            description: '',
            icon: '',
            required: false,
          },
        ],
        users: [
          {
            avatar: '',
            content: '',
            icon: '',
            description: '',
            rate: '',
          },
        ],
      }}
      autoComplete='off'
    >
      <div className={styles.containerBtn}>
        <Button
          size='large'
          htmlType='submit'
          className={styles.btn}
          type='green'
          loading={requestSetupLdpage?.loading || requestEditSetupLdpage?.loading}
        >
          Lưu
        </Button>
      </div>

      <Tabs type='card' className={styles.tab} items={itemsTab} />
    </Form>
  );
};
export default PageManagement;
