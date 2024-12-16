import { Form, Tabs } from 'antd';
import { TabsProps } from 'antd/lib';

import Button from '@components/UI/Button/Button';

import styles from './index.module.scss';
import SettingBanner from './SettingBanner';


const PageManagement = () => {
  const [form] = Form.useForm();

  const itemsTab: TabsProps['items'] = [
    {
      label: 'Banner',
      key: 'banner',
      children: <SettingBanner form={form} />,
    },
    {
      label: 'Tổng quan',
      key: 'overview',
      children: '2',
    },
    {
      label: 'Tab 3',
      key: 'tab_3',
      children: '3',
    },
    {
      label: 'Tính năng nổi bật',
      key: 'feature',
      children: '4',
    },
    {
      label: 'Đánh giá',
      key: 'evaluate',
      children: '5',
    },
  ];

  // const onFinish = (values: any) => {
  //   console.log('Received values of form:', values);
  // };


  return (
    <Form
      name="dynamic_form_nest_item"
      // onFinish={onFinish}
      form={form}
      initialValues={{
        banners: [{
          title: '',
          description: '',
          image: '',
          required: false
        }]
      }}
      autoComplete="off"

    >
      <div className={styles.containerBtn}>
        <Button
          size='large'
          htmlType="submit"
          className={styles.btn}
          type='green'
        >
          Lưu
        </Button>
      </div>

      <Tabs
        type="card"
        items={itemsTab}
      />
    </Form>
  )
}
export default PageManagement