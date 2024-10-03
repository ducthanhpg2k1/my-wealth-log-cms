import { Col, DatePicker, Form, Row, Space, Spin } from 'antd';

import Button from '@components/UI/Button/Button';
import Text from '@components/UI/Text';

import CardSituation from './CardSituation';
import CardTransactionComplicated from './CardTransactionComplicated';
import CardTransactionType from './CardTransactionType';
import styles from './index.module.scss';
import {
  useGetReportNewAssets,
  useGetReportNewUser,
  useGetReportNotifications,
  useGetReportTransactions,
} from './service';

const Statistics = () => {
  const [form] = Form.useForm();

  const { dataNewUser, onChange: onChangeNewUser, loading: loadingNewUser } = useGetReportNewUser();
  const {
    dataNewAssets,
    onChange: onChangeNewAssets,
    loading: loadingNewAssets,
  } = useGetReportNewAssets();

  const {
    dataNotifications,
    onChange: onChangeNotifications,
    loading: loadingNotifications,
  } = useGetReportNotifications();

  const {
    dataTransactions,
    onChange: onChangeTransactions,
    loading: loadingTransactions,
  } = useGetReportTransactions();

  const onHandleFilter = (values: any) => {
    const filter = {
      createdAtFrom: values?.createdAtFrom,
      createdAtTo: values?.createdAtTo,
    };
    onChangeNewAssets(filter);
    onChangeNotifications(filter);
    onChangeTransactions(filter);
    onChangeNewUser(filter);
  };

  return (
    <Spin
      spinning={loadingNewUser || loadingNewAssets || loadingNotifications || loadingTransactions}
    >
      <div className={styles.container}>
        <Row align={'middle'} justify={'space-between'}>
          <Text type='font-18-600' color='text-primary'>
            Tổng quan
          </Text>
          <Form form={form} layout='vertical' onFinish={onHandleFilter}>
            <Space size={24}>
              <Space size={8}>
                <Text type='font-14-400' color='text-primary'>
                  Từ:
                </Text>
                <Form.Item noStyle name='createdAtFrom'>
                  <DatePicker />
                </Form.Item>
              </Space>
              <Space size={8}>
                <Text type='font-14-400' color='text-primary'>
                  Đến:
                </Text>
                <Form.Item noStyle name='createdAtTo'>
                  <DatePicker />
                </Form.Item>

                <Button
                  loading={
                    loadingNewUser ||
                    loadingNewAssets ||
                    loadingNotifications ||
                    loadingTransactions
                  }
                  htmlType='submit'
                  size='medium'
                  className={styles.btn}
                  type='green'
                >
                  Tìm kiếm
                </Button>
              </Space>
            </Space>
          </Form>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <CardHeader count={dataNewUser?.data?.count} title='USER ĐĂNG KÝ MỚI' />
          </Col>
          <Col span={6}>
            <CardHeader title='tài sản' count={dataNewAssets?.data?.count} />
          </Col>
          <Col span={6}>
            <CardHeader
              title='thông báo đã đọc/ đã gửi'
              count={`${dataNotifications?.data?.countRead}/${dataNotifications?.data?.countAll}`}
            />
          </Col>

          <Col span={6}>
            <CardHeader title='lượt tạo giao dịch' count={dataTransactions?.data?.count} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <CardTransactionType />
          </Col>
          <Col span={12}>
            <CardTransactionComplicated />
          </Col>
        </Row>
        <CardSituation />
      </div>
    </Spin>
  );
};
export default Statistics;

const CardHeader = ({ title, count }: { title: string; count: string }) => {
  return (
    <div className={styles.card}>
      <Text type='font-12-400' color='text-primary' className={styles.titleCard}>
        {title}
      </Text>
      <Text type='font-32-600' color='text-primary'>
        {count}
      </Text>
    </div>
  );
};
