/* eslint-disable unicorn/no-null */
/* eslint-disable no-console */
import { useRef, useState } from 'react';

import { useMount } from 'ahooks';
import { DatePicker, Form, Row, Space, Table, Tag, Button as ButtonAntd } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import dayjs from 'dayjs';
import FileSaver from 'file-saver';
import Image from 'next/image';

import Button from '@components/UI/Button/Button';
import NoDataTable from '@components/UI/NoDataTable';
import SelectCustom from '@components/UI/SelectCustom';
import Text from '@components/UI/Text';
import { openNotification, STATUS_USER } from '@utils/common';

import styles from './index.module.scss';
import ModalDeleteUsers from './ModalDeleteUsers';
import { useExportFileUser, useGetUser } from './service';

const User = () => {
  const { dataUsers, onChange, loading, run } = useGetUser();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const refModalDeleteUsers: any = useRef();

  const requestExportFileJobSetup = useExportFileUser({
    onSuccess: (res) => {
      openNotification('Export file success', 'success');

      FileSaver.saveAs(res, 'User.xlsx');
    },
    onError(e) {
      openNotification(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const columns: TableColumnsType<any> = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      render: (_, record) => {
        return (
          <Text type='font-14-400' color='text-primary'>
            {record?.displayName}
          </Text>
        );
      },
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <Tag color={record?.isActived ? 'green' : 'red'}>
            {record?.isActived ? 'Active' : 'Inactive'}
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
            {record?.email || record?.phoneNumber}
          </Text>
        );
      },
    },
    {
      title: (
        <>
          <ButtonAntd
            type='text'
            shape='circle'
            size='middle'
            onClick={() => refModalDeleteUsers?.current?.onOpen(selectedRowKeys)}
            icon={
              <Image
                width={20}
                height={20}
                alt=''
                style={{
                  width: '20px',
                  height: '20px',
                }}
                src={'/svgIcon/ic-delete1.svg'}
              />
            }
            style={{
              visibility: selectedRowKeys?.length > 0 ? 'visible' : 'hidden',
            }}
          />
        </>
      ),
      align: 'end',
      dataIndex: 'action',
    },
  ];
  const rowSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  useMount(() => {
    const valuesFilter = form.getFieldsValue();
    const formattedCreatedAtFrom = valuesFilter?.createdAtFrom
      ? dayjs(valuesFilter?.createdAtFrom)?.toISOString()
      : null;
    const formattedCreatedAtTo = valuesFilter?.createdAtTo
      ? dayjs(valuesFilter?.createdAtTo)?.toISOString()
      : null;
    const filter = {
      createdAtFrom: formattedCreatedAtFrom,
      createdAtTo: formattedCreatedAtTo,
      isActived: valuesFilter?.isActived,
    };
    run(1, filter);
  });

  const onHandleFilter = (values: any) => {
    const formattedCreatedAtFrom = values?.createdAtFrom
      ? dayjs(values?.createdAtFrom)?.toISOString()
      : null;
    const formattedCreatedAtTo = values?.createdAtTo
      ? dayjs(values?.createdAtTo)?.toISOString()
      : null;

    const filter = {
      createdAtFrom: formattedCreatedAtFrom,
      createdAtTo: formattedCreatedAtTo,
      isActived: values?.isActived,
    };
    onChange(1, filter);
  };

  const handleExportExcel = () => {
    const valuesFilter = form.getFieldsValue();
    const formattedCreatedAtFrom = valuesFilter?.createdAtFrom
      ? dayjs(valuesFilter?.createdAtFrom)?.toISOString()
      : null;
    const formattedCreatedAtTo = valuesFilter?.createdAtTo
      ? dayjs(valuesFilter?.createdAtTo)?.toISOString()
      : null;
    const filter = {
      createdAtFrom: formattedCreatedAtFrom,
      createdAtTo: formattedCreatedAtTo,
      isActived: valuesFilter?.isActived,
    };

    requestExportFileJobSetup?.run(filter);
  };

  return (
    <div className={styles.container}>
      <Form
        initialValues={{
          isActived: STATUS_USER.ACTIVE,
        }}
        form={form}
        layout='vertical'
        onFinish={onHandleFilter}
      >
        <div className={styles.header}>
          <Text type='font-18-600'>Tìm kiếm</Text>
          <div className={styles.cardFilter}>
            <div className={styles.leftFilter}>
              <Space size={12}>
                <Text type='font-14-400' color='text-primary'>
                  Đăng kí mới từ:
                </Text>
                <Form.Item noStyle name='createdAtFrom'>
                  <DatePicker size='large' format='DD-MM-YYYY' />
                </Form.Item>
              </Space>
              <Space size={12}>
                <Text type='font-14-400' color='text-primary'>
                  Đến:
                </Text>
                <Form.Item noStyle name='createdAtTo'>
                  <DatePicker size='large' format='DD-MM-YYYY' />
                </Form.Item>
              </Space>
              <Space size={12}>
                <Text type='font-14-400' color='text-primary'>
                  Trạng thái hoạt động:
                </Text>
                <Form.Item noStyle name='isActived'>
                  <SelectCustom
                    allowClear
                    style={{ minWidth: '140px' }}
                    defaultValue={STATUS_USER.ACTIVE}
                    options={[
                      {
                        label: 'Active',
                        value: STATUS_USER.ACTIVE,
                      },
                      {
                        label: 'Inactive',
                        value: STATUS_USER.INACTIVE,
                      },
                    ]}
                    size='large'
                    placeholder={'Chọn trạng thái'}
                  />
                </Form.Item>
              </Space>
            </div>
            <Space size={12}>
              <Button htmlType='submit' size='large' className={styles.btnSearch} type='green'>
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
                onClick={handleExportExcel}
                size='large'
                loading={requestExportFileJobSetup?.loading}
                className={styles.btnSearch}
                type='yellow'
              >
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
      </Form>

      <div className={styles.content}>
        <Space size={4}>
          <Text type='font-18-600'>
            Kết quả tìm kiếm{' '}
            {dataUsers?.data?.items?.length > 0 && (
              <Text element='span' color='neutral-400' type='font-14-400'>
                {`(${dataUsers?.data?.total} bản ghi)`}
              </Text>
            )}
          </Text>
        </Space>
        <Table
          locale={{ emptyText: <NoDataTable /> }}
          rowSelection={{ ...rowSelection }}
          columns={columns}
          rowKey='id'
          loading={loading}
          dataSource={dataUsers?.data?.items}
          pagination={{
            current: dataUsers?.data?.page,
            total: dataUsers?.data?.total,
            showSizeChanger: false,
            onChange: (page: number) => onChange(page),
            pageSize: dataUsers?.data?.pageSize,
          }}
        />
      </div>
      <ModalDeleteUsers reloadList={run} ref={refModalDeleteUsers} />
    </div>
  );
};
export default User;
