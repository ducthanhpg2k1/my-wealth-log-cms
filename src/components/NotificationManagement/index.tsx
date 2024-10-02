/* eslint-disable indent */
/* eslint-disable no-console */
import { useRef } from 'react';

import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, Row, Space, Table, Button as ButtonAntd, Checkbox, Form } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import Image from 'next/image';

import Button from '@components/UI/Button/Button';
import InputText from '@components/UI/InputText';
import NoDataTable from '@components/UI/NoDataTable';
import Text from '@components/UI/Text';

import DrawerAddNotification from './DrawerAddNotification';
import DrawerDetailNotification from './DrawerDetailNotification';
import styles from './index.module.scss';
import ModalDeleteNotification from './ModalDeleteNotification';
import { useGetNotifications } from './service';

const NotificationManagement = () => {
  const refDrawerAddNotification: any = useRef();
  const refModalDeleteNotification: any = useRef();
  const refDrawerDetailNotification: any = useRef();
  const [form] = Form.useForm();

  const { dataNotifications, onChange, loading, run } = useGetNotifications();

  const onClickAction =
    (record: any) =>
    ({ key }: any) => {
      if (key === 'edit') {
        refDrawerDetailNotification.current.onOpen(record?.id);
      }
      if (key === 'delete') {
        refModalDeleteNotification?.current?.onOpen(record?.id);
      }
    };

  const columns: TableColumnsType<any> = [
    {
      title: 'Tên thông báo',
      dataIndex: 'name',
      width: 250,
      render: (_, record) => {
        return (
          <Text type='font-14-400' color='text-primary'>
            {record?.name}
          </Text>
        );
      },
    },
    {
      title: 'Nội dung thông báo',
      dataIndex: 'conent',
      width: 850,
      render: (_, record) => {
        return (
          <Space direction='vertical' size={12}>
            <Text className={styles.textContent} type='font-14-400' color='text-primary'>
              {record?.content}
            </Text>
            {record?.content?.url && (
              <Image
                src={record?.content?.url}
                alt=''
                width={56}
                height={56}
                style={{
                  width: '56px',
                  height: '56px',
                }}
              />
            )}
          </Space>
        );
      },
    },
    {
      title: 'Lặp lại',
      width: 150,
      dataIndex: 'repeat',
      render: (_, record) => {
        return <Checkbox className={styles.checkboxCustom} checked={record.repeat} />;
      },
    },
    {
      title: 'Tần suất lặp lại',
      dataIndex: 'repeat_weekly',
      render: (_, record) => {
        return (
          <Text type='font-14-400' color='text-primary'>
            {record?.frequencyId?.name}
          </Text>
        );
      },
    },

    {
      title: '',
      align: 'end',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <a onClick={(e) => e.stopPropagation()}>
            <Dropdown
              placement='bottomRight'
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: 'edit',
                    label: 'Chỉnh sửa',
                    icon: (
                      <Image
                        src={'/svgIcon/ic-edit.svg'}
                        alt=''
                        width={24}
                        height={24}
                        className={styles.iconAction}
                      />
                    ),
                  },
                  {
                    type: 'divider',
                  },
                  {
                    key: 'delete',
                    label: 'Xóa',
                    icon: (
                      <Image
                        src={'/svgIcon/ic-delete.svg'}
                        alt=''
                        width={16}
                        height={16}
                        style={{
                          width: '18px',
                          height: '18px',
                          marginRight: '14px',
                        }}
                      />
                    ),
                  },
                ],
                onClick: onClickAction(record),
              }}
            >
              <ButtonAntd type='text' shape='circle' icon={<MoreOutlined size={24} />} />
            </Dropdown>
          </a>
        );
      },
    },
  ];

  const rowSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows:', selectedRows);
    },
  };
  const onHandleFilter = (values: any) => {
    const filter = {
      content: values?.content,
      repeat: values?.repeat,
    };
    onChange(filter);
  };

  return (
    <div className={styles.container}>
      <Form form={form} layout='vertical' onFinish={onHandleFilter}>
        <div className={styles.header}>
          <Text type='font-18-600'>Tìm kiếm</Text>
          <div className={styles.cardFilter}>
            <div className={styles.leftFilter}>
              <Space size={12}>
                <Text type='font-14-400' color='text-primary'>
                  Nội dung :
                </Text>
                <Form.Item noStyle name='content'>
                  <InputText
                    style={{
                      minWidth: '603px',
                    }}
                    size='large'
                    placeholder='Nhập nội dung tìm kiếm'
                  />
                </Form.Item>
              </Space>
              <Space size={8}>
                <Text type='font-14-400' color='text-primary'>
                  Lặp lại :
                </Text>
                <Form.Item valuePropName='checked' noStyle name='repeat'>
                  <Checkbox className={styles.checkboxCustom} />
                </Form.Item>
              </Space>
            </div>
            <Space size={12}>
              <Button size='large' htmlType='submit' className={styles.btnSearch} type='green'>
                <Row align={'middle'} style={{ gap: '4px' }}>
                  <Image
                    src={'/svgIcon/ic-search.svg'}
                    width={24}
                    height={24}
                    alt=''
                    className={styles.icSearch}
                  />
                  <Text color='background-default' type='font-14-400'>
                    Tìm kiếm
                  </Text>
                </Row>
              </Button>
              <Button
                onClick={() => refDrawerAddNotification.current.onOpen()}
                className={styles.btnSearch}
                type='blue'
              >
                <Row align={'middle'} style={{ gap: '8px' }}>
                  <PlusOutlined size={24} />
                  <Text color='background-default' type='font-14-400'>
                    Thêm mới
                  </Text>
                </Row>
              </Button>
            </Space>
          </div>
        </div>
      </Form>

      <div className={styles.content}>
        <Space size={4}>
          <Text type='font-18-600'>
            Kết quả tìm kiếm{' '}
            <Text element='span' color='neutral-400' type='font-14-400'>
              {`(${dataNotifications?.data?.length}bảng ghi)`}
            </Text>
          </Text>
        </Space>
        <Table
          locale={{ emptyText: <NoDataTable /> }}
          rowSelection={{ ...rowSelection }}
          columns={columns}
          dataSource={dataNotifications?.data}
          loading={loading}
        />
      </div>

      <DrawerAddNotification reloadList={run} ref={refDrawerAddNotification} />
      <ModalDeleteNotification reloadList={run} ref={refModalDeleteNotification} />
      <DrawerDetailNotification
        refModalDeleteNotification={refModalDeleteNotification}
        refDrawerAddNotification={refDrawerAddNotification}
        ref={refDrawerDetailNotification}
      />
    </div>
  );
};
export default NotificationManagement;
