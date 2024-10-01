import { Col, DatePicker, Row, Space } from 'antd';

import Button from '@components/UI/Button/Button';
import Text from '@components/UI/Text';

import CardSituation from './CardSituation';
import CardTransactionComplicated from './CardTransactionComplicated';
import CardTransactionType from './CardTransactionType';
import styles from './index.module.scss';

const Statistics = () => {
  return (
    <div className={styles.container}>
      <Row align={'middle'} justify={'space-between'}>
        <Text type='font-18-600' color='text-primary'>
          Tổng quan
        </Text>
        <Space size={24}>
          <Space size={8}>
            <Text type='font-14-400' color='text-primary'>
              Từ:
            </Text>
            <DatePicker />
          </Space>
          <Space size={8}>
            <Text type='font-14-400' color='text-primary'>
              Đến:
            </Text>
            <DatePicker />
            <Button size='medium' className={styles.btn} type='green'>
              Tìm kiếm
            </Button>
          </Space>
        </Space>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <CardHeader title='USER ĐĂNG KÝ MỚI' count='200' />
        </Col>
        <Col span={6}>
          <CardHeader title='tài sản' count='150' />
        </Col>
        <Col span={6}>
          <CardHeader title='thông báo đã đọc/ đã gửi' count='20/70' />
        </Col>

        <Col span={6}>
          <CardHeader title='lượt tạo giao dịch' count='150' />
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
