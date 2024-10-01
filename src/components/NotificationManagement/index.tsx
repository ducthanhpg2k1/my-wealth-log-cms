/* eslint-disable indent */
/* eslint-disable no-console */
import { useRef } from 'react';

import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, Row, Space, Table, Button as ButtonAntd, Checkbox } from 'antd';
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

interface DataType {
  key: React.Key;
  name: string;
  content: {
    text: string;
    url: string;
  };
  repeat: boolean;
  repeat_weekly: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'Thông báo Abc',
    content: {
      text: 'Lorem ipsum dolor sit amet consectetur. Semper nibh sit tincidunt posuere aliquam tellus. Aliquam semper convallis. Lorem ipsum dolor sit amet consectetur. Semper nibh sit tincidunt posuere aliquam tellus. Aliquam semper convallis.',
      url: '',
    },
    repeat: true,
    repeat_weekly: 'Hàng tháng',
  },
  {
    key: '2',
    name: 'Thông báo Abc',
    content: {
      text: 'Lorem ipsum dolor sit amet consectetur. Semper nibh sit tincidunt posuere aliquam tellus. Aliquam semper convallis. Lorem ipsum dolor sit amet consectetur. Semper nibh sit tincidunt posuere aliquam tellus. Aliquam semper convallis.',
      url: '/images/img-content.png',
    },
    repeat: false,
    repeat_weekly: 'Hàng tháng',
  },
  {
    key: '3',
    name: 'Thông báo Abc',
    content: {
      text: 'Lorem ipsum dolor sit amet consectetur. Semper nibh sit tincidunt posuere aliquam tellus. Aliquam semper convallis. Lorem ipsum dolor sit amet consectetur. Semper nibh sit tincidunt posuere aliquam tellus. Aliquam semper convallis.',
      url: '',
    },
    repeat: true,
    repeat_weekly: 'Hàng tháng',
  },
];

const NotificationManagement = () => {
  const refDrawerAddNotification: any = useRef();
  const refModalDeleteNotification: any = useRef();
  const refDrawerDetailNotification: any = useRef();

  const onClickAction =
    (record: any) =>
    ({ key }: any) => {
      if (key === 'edit') {
        refDrawerDetailNotification.current.onOpen(record?.key);
      }
      if (key === 'delete') {
        refModalDeleteNotification?.current?.onOpen(record?.key);
      }
    };

  const columns: TableColumnsType<DataType> = [
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
              {record?.content?.text}
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
        return <Checkbox className={styles.checkboxCustom} defaultChecked={record.repeat} />;
      },
    },
    {
      title: 'Tần suất lặp lại',
      dataIndex: 'repeat_weekly',
      render: (_, record) => {
        return (
          <Text type='font-14-400' color='text-primary'>
            {record?.repeat_weekly}
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

  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows:', selectedRows);
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text type='font-18-600'>Tìm kiếm</Text>
        <div className={styles.cardFilter}>
          <div className={styles.leftFilter}>
            <Space size={12}>
              <Text type='font-14-400' color='text-primary'>
                Nội dung :
              </Text>
              <InputText
                style={{
                  minWidth: '603px',
                }}
                size='large'
                placeholder='Nhập nội dung tìm kiếm'
              />
            </Space>
          </div>
          <Space size={12}>
            <Button className={styles.btnSearch} type='green'>
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
      <div className={styles.content}>
        <Space size={4}>
          <Text type='font-18-600'>
            Kết quả tìm kiếm{' '}
            <Text element='span' color='neutral-400' type='font-14-400'>
              (3 bảng ghi)
            </Text>
          </Text>
        </Space>
        <Table
          locale={{ emptyText: <NoDataTable /> }}
          rowSelection={{ ...rowSelection }}
          columns={columns}
          dataSource={data}
        />
      </div>

      <DrawerAddNotification ref={refDrawerAddNotification} />
      <ModalDeleteNotification ref={refModalDeleteNotification} />
      <DrawerDetailNotification
        refModalDeleteNotification={refModalDeleteNotification}
        refDrawerAddNotification={refDrawerAddNotification}
        ref={refDrawerDetailNotification}
      />
    </div>
  );
};
export default NotificationManagement;
