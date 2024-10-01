/* eslint-disable no-console */
import { DatePicker, Row, Space, Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import Image from 'next/image';

import Button from '@components/UI/Button/Button';
import NoDataTable from '@components/UI/NoDataTable';
import SelectCustom from '@components/UI/SelectCustom';
import Text from '@components/UI/Text';
import { capitalizeFirstLetter, STATUS_USER } from '@utils/common';

import styles from './index.module.scss';

interface DataType {
  key: React.Key;
  name: string;
  sdt_email: string;
  status: STATUS_USER;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'Nguyễn An',
    sdt_email: 'your_email@gmail.com',
    status: STATUS_USER.ACTIVE,
  },
  {
    key: '2',
    name: 'Nguyễn Như Nguyên Minh',
    sdt_email: '0912345678',
    status: STATUS_USER.INACTIVE,
  },
  {
    key: '3',
    name: 'Nguyễn Như Nguyên Minh',
    sdt_email: 'your_email@gmail.com',
    status: STATUS_USER.ACTIVE,
  },
];

const User = () => {
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      render: (_, record) => {
        return (
          <Text type='font-14-400' color='text-primary'>
            {record?.name}
          </Text>
        );
      },
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <Tag color={record?.status === STATUS_USER?.ACTIVE ? 'green' : 'red'}>
            {capitalizeFirstLetter(record?.status)}
          </Tag>
        );
      },
    },
    {
      title: 'Số điện thoại/Email',
      dataIndex: 'sdt/email',
      render: (_, record) => {
        return (
          <Text type='font-14-400' color='text-primary'>
            {record?.sdt_email}
          </Text>
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
                Đăng kí mới từ:
              </Text>
              <DatePicker size='large' format='DD-MM-YYYY' />
            </Space>
            <Space size={12}>
              <Text type='font-14-400' color='text-primary'>
                Đến:
              </Text>
              <DatePicker size='large' format='DD-MM-YYYY' />
            </Space>
            <Space size={12}>
              <Text type='font-14-400' color='text-primary'>
                Trạng thái hoạt động:
              </Text>
              <SelectCustom
                style={{ minWidth: '170px' }}
                options={[]}
                size='large'
                placeholder={'Chọn trạng thái'}
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
            <Button className={styles.btnSearch} type='blue'>
              <Row align={'middle'} style={{ gap: '4px' }}>
                <Image
                  src={'/svgIcon/ic-upload_file.svg'}
                  width={24}
                  height={24}
                  alt=''
                  className={styles.icSearch}
                />
                <Text color='background-default' type='font-14-400'>
                  Xuất excel
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
    </div>
  );
};
export default User;
