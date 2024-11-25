import { useMemo } from 'react';

import { useMount } from 'ahooks';
import { Col, DatePicker, Form, Row, Space, Spin } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';

import Button from '@components/UI/Button/Button';
import Text from '@components/UI/Text';

import CardSituation from './CardSituation';
import CardTransactionComplicated from './CardTransactionComplicated';
import CardTransactionType from './CardTransactionType';
import styles from './index.module.scss';
import {
  useGetReportLoan,
  useGetReportNewAssets,
  useGetReportNewUser,
  useGetReportNotifications,
  useGetReportTransactions,
  useGetReportTransactionsByCreateType,
  useGetReportTransactionsByType,
} from './service';

const Statistics = () => {
  const [form] = Form.useForm();
  const firstDayOfMonth = dayjs().startOf('day').toISOString();
  const currentDayOfMonth = dayjs().endOf('day').toISOString();

  const disabledDateFrom = (current: any) => {
    const toDate = form.getFieldValue('createdAtTo');
    if (!toDate) {
      return false;
    }
    return current && current > dayjs(toDate);
  };

  const disabledDateTo = (current: any) => {
    const fromDate = form.getFieldValue('createdAtFrom');
    if (!fromDate) {
      return false;
    }
    return current && current < dayjs(fromDate);
  };

  const filterDate = useMemo(() => {
    const filter = {
      createdAtFrom: firstDayOfMonth,
      createdAtTo: currentDayOfMonth,
    };
    return filter;
  }, [firstDayOfMonth, currentDayOfMonth]);

  const {
    dataNewUser,
    onChange: onChangeNewUser,
    loading: loadingNewUser,
    run: runGetReportNewUser,
  } = useGetReportNewUser();
  const {
    dataNewAssets,
    onChange: onChangeNewAssets,
    run: runNewAssets,
    loading: loadingNewAssets,
  } = useGetReportNewAssets();

  const {
    dataNotifications,
    onChange: onChangeNotifications,
    run: runNotifications,
    loading: loadingNotifications,
  } = useGetReportNotifications();

  const {
    dataTransactions,
    onChange: onChangeTransactions,
    loading: loadingTransactions,
    run: runTransactions,
  } = useGetReportTransactions();

  const {
    dataTransactionsByType,
    onChange: onChangeTransactionsByType,
    loading: loadingTransactionsByType,
    run: runGetTransactionsByType,
  } = useGetReportTransactionsByType();

  const {
    dataTransactionsByCreateType,
    onChange: onChangeTransactionsByCreateType,
    loading: loadingTransactionsByCreateType,
    run: runGetTransactionsByCreateType,
  } = useGetReportTransactionsByCreateType();

  const {
    dataTransactionsLoan,
    onChange: onChangeLoan,
    loading: loadingLoan,
    run: runGetLoan,
  } = useGetReportLoan();

  useMount(() => {
    runGetTransactionsByType(filterDate);
    runGetTransactionsByCreateType(filterDate);
    runGetLoan(filterDate);
    runNewAssets(filterDate);
    runNotifications(filterDate);
    runTransactions(filterDate);
    runGetReportNewUser(filterDate);
  });

  const onHandleFilter = (values: any) => {
    const filter = {
      createdAtFrom: values?.createdAtFrom
        ? dayjs(values?.createdAtFrom).startOf('day').toISOString()
        : '',
      createdAtTo: values?.createdAtTo ? dayjs(values?.createdAtTo).endOf('day').toISOString() : '',
    };

    onChangeNewAssets(filter);
    onChangeNotifications(filter);
    onChangeTransactions(filter);
    onChangeNewUser(filter);
    onChangeLoan(filter);
    onChangeTransactionsByCreateType(filter);
    onChangeTransactionsByType(filter);
  };

  return (
    <Spin
      spinning={
        loadingLoan ||
        loadingTransactionsByCreateType ||
        loadingTransactionsByType ||
        loadingNewUser ||
        loadingNewAssets ||
        loadingNotifications ||
        loadingTransactions
      }
    >
      <div className={styles.container}>
        <Row align={'middle'} justify={'space-between'}>
          <Text type='font-18-600' color='text-primary'>
            Tổng quan
          </Text>
          <Form
            initialValues={{
              createdAtFrom: dayjs(),
              createdAtTo: dayjs(),
            }}
            form={form}
            layout='vertical'
            onFinish={onHandleFilter}
          >
            <Space size={24}>
              <Space size={8}>
                <Text type='font-14-400' color='text-primary'>
                  Từ:
                </Text>
                <Form.Item noStyle name='createdAtFrom'>
                  <DatePicker
                    placeholder='02-02-2000'
                    defaultValue={dayjs()}
                    format='DD-MM-YYYY'
                    disabledDate={disabledDateFrom}
                    size='large'
                  />
                </Form.Item>
              </Space>
              <Space size={8}>
                <Text type='font-14-400' color='text-primary'>
                  Đến:
                </Text>
                <Form.Item noStyle name='createdAtTo'>
                  <DatePicker
                    placeholder='02-02-2000'
                    defaultValue={dayjs()}
                    format='DD-MM-YYYY'
                    disabledDate={disabledDateTo}
                    size='large'
                  />
                </Form.Item>

                <Button
                  loading={
                    loadingLoan ||
                    loadingTransactionsByCreateType ||
                    loadingTransactionsByType ||
                    loadingNewUser ||
                    loadingNewAssets ||
                    loadingNotifications ||
                    loadingTransactions
                  }
                  htmlType='submit'
                  size='large'
                  className={styles.btn}
                  type='green'
                >
                  <Row align={'middle'} style={{ gap: '4px' }}>
                    <Image
                      src={'/svgIcon/ic-search.svg'}
                      width={24}
                      height={24}
                      alt=''
                      style={{
                        width: '24px',
                        height: '24px',
                      }}
                    />
                    <Text color='background-default' type='font-14-400'>
                      Tìm kiếm
                    </Text>
                  </Row>
                </Button>
              </Space>
            </Space>
          </Form>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <CardHeader count={dataNewUser?.data?.count || 0} title='USER ĐĂNG KÝ MỚI' />
          </Col>
          <Col span={6}>
            <CardHeader title='tài sản' count={dataNewAssets?.data?.count || 0} />
          </Col>
          <Col span={6}>
            <CardHeader
              title='thông báo đã đọc/ đã gửi'
              count={`${dataNotifications?.data?.countRead || 0}/${
                dataNotifications?.data?.countAll || 0
              }`}
            />
          </Col>

          <Col span={6}>
            <CardHeader
              title='lượt tạo giao dịch bình quân'
              count={
                dataTransactions?.data?.count > 0 && dataNewUser?.data?.count > 0
                  ? Number((dataTransactions?.data?.count / dataNewUser?.data?.count).toFixed(2))
                  : 0
              }
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <CardTransactionType data={dataTransactionsByType?.data} />
          </Col>
          <Col span={12}>
            <CardTransactionComplicated data={dataTransactionsByCreateType?.data} />
          </Col>
        </Row>
        <CardSituation data={dataTransactionsLoan?.data} />
      </div>
    </Spin>
  );
};
export default Statistics;

const CardHeader = ({ title, count }: { title: string; count: string | number }) => {
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
