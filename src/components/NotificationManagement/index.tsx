/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-console */
import { useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Dropdown, Row, Space, Table, Button as ButtonAntd, Checkbox, Form, Tooltip } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import FileSaver from 'file-saver';
import Image from 'next/image';

import Button from '@components/UI/Button/Button';
import { IconDots } from '@components/UI/Icons';
import InputText from '@components/UI/InputText';
import NoDataTable from '@components/UI/NoDataTable';
import SelectCustom from '@components/UI/SelectCustom';
import Text from '@components/UI/Text';
import { openNotification, TYPE_REPEAT } from '@utils/common';

import DrawerAddNotification from './DrawerAddNotification';
import DrawerDetailNotification from './DrawerDetailNotification';
import styles from './index.module.scss';
import ModalDeleteNotification from './ModalDeleteNotification';
import ModalDeleteNotifications from './ModalDeleteNotifications';
import { useExportFileNotification, useGetNotifications } from './service';

const NotificationManagement = () => {
  const refDrawerAddNotification: any = useRef();
  const refModalDeleteNotification: any = useRef();
  const refModalDeleteNotifications: any = useRef();

  const refDrawerDetailNotification: any = useRef();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [errorImages, setErrorImages] = useState<string[]>([]);
  const { dataNotifications, onChange, loading, run } = useGetNotifications();
  const [isFilter, setIsFilter] = useState(false);
  const [valueFilter, setValueFilter] = useState<any>({});

  const requestExportFileNotification = useExportFileNotification({
    onSuccess: (res) => {
      openNotification('Export file success', 'success');

      FileSaver.saveAs(res, 'Notification.xlsx');
    },
    onError(e) {
      openNotification(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const onClickAction =
    (record: any) =>
    ({ key }: any) => {
      if (key === 'edit') {
        refDrawerAddNotification.current.onOpen(record?.id);
      }
      if (key === 'delete') {
        refModalDeleteNotification?.current?.onOpen(record?.id);
      }
    };

  const columns: TableColumnsType<any> = [
    {
      title: 'Tên thông báo',
      dataIndex: 'name',
      width: 350,
      render: (_, record) => {
        return (
          <Tooltip title={record?.name} placement='top'>
            <a>
              <Text type='font-14-400' color='text-primary'>
                {record?.name?.length > 50 ? `${record?.name?.slice(0, 50)}...` : record?.name}
              </Text>
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: 'Nội dung thông báo',
      dataIndex: 'conent',
      width: 350,
      render: (_, record) => {
        return (
          <Space direction='vertical' size={12}>
            <Tooltip title={record?.name} placement='top'>
              <a>
                <Text className={styles.textContent} type='font-14-400' color='text-primary'>
                  {record?.content?.length > 50
                    ? `${record?.content?.slice(0, 50)}...`
                    : record?.content}
                </Text>
              </a>
            </Tooltip>

            {record?.image && (
              <Image
                src={errorImages.includes(record?.id) ? '/images/default-image.jpg' : record?.image}
                alt=''
                width={56}
                onError={() => {
                  setErrorImages((prev) => [...prev, record?.id]);
                }}
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
      width: 200,
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
      title: (
        <>
          <ButtonAntd
            type='text'
            shape='circle'
            onClick={() => refModalDeleteNotifications?.current?.onOpen(selectedRowKeys)}
            size='middle'
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
              <ButtonAntd type='text' shape='circle' icon={<IconDots />} />
            </Dropdown>
          </a>
        );
      },
    },
  ];

  const handleExportExcel = () => {
    const formFilter = form.getFieldsValue();

    const filter = isFilter
      ? {
          content: formFilter?.content,
          repeat: [TYPE_REPEAT.YES, TYPE_REPEAT.NO].includes(formFilter?.repeat)
            ? formFilter?.repeat === TYPE_REPEAT.YES
            : '',
          ids: selectedRowKeys,
        }
      : {
          content: valueFilter?.content,
          repeat: [TYPE_REPEAT.YES, TYPE_REPEAT.NO].includes(valueFilter?.repeat)
            ? valueFilter?.repeat === TYPE_REPEAT.YES
            : '',
          ids: selectedRowKeys,
        };
    requestExportFileNotification?.run(filter);
  };

  const rowSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  const onHandleFilter = (values: any) => {
    console.log(values, 'values');

    const filter = {
      content: values?.content,
      repeat: [TYPE_REPEAT.YES, TYPE_REPEAT.NO].includes(values?.repeat)
        ? values?.repeat === TYPE_REPEAT.YES
        : '',
    };
    onChange(1, filter);
    setSelectedRowKeys([]);
    setIsFilter(true);
    setValueFilter(filter);
  };
  const onValuesChange = (values: any) => {
    setIsFilter(false);
  };

  const onChangeFilterTable: TableProps<any>['onChange'] = (pagination) => {
    const valuesFilter = form.getFieldsValue();
    const filter = {
      content: valuesFilter?.content,
      repeat: [TYPE_REPEAT.YES, TYPE_REPEAT.NO].includes(valuesFilter?.repeat)
        ? valuesFilter?.repeat === TYPE_REPEAT.YES
        : '',
    };

    onChange(pagination?.current, filter);
  };

  return (
    <div className={styles.container}>
      <Form form={form} layout='vertical' onValuesChange={onValuesChange} onFinish={onHandleFilter}>
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
                    className={styles.inputSearch}
                    size='large'
                    placeholder='Nhập tên thông báo/nội dung thông báo'
                  />
                </Form.Item>
              </Space>
              <Space size={8}>
                <Text type='font-14-400' color='text-primary'>
                  Lặp lại :
                </Text>
                <Form.Item noStyle name='repeat'>
                  <SelectCustom
                    allowClear
                    style={{ minWidth: '140px' }}
                    options={[
                      {
                        label: 'Có',
                        value: TYPE_REPEAT.YES,
                      },
                      {
                        label: 'Không',
                        value: TYPE_REPEAT.NO,
                      },
                    ]}
                    size='large'
                    placeholder={'Chọn lặp lại'}
                  />
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
              <Button
                onClick={handleExportExcel}
                size='large'
                loading={requestExportFileNotification?.loading}
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
            {dataNotifications?.data?.items?.length > 0 && (
              <Text element='span' color='neutral-400' type='font-14-400'>
                {`(${dataNotifications?.data?.total} bản ghi)`}
              </Text>
            )}
          </Text>
        </Space>
        <Table
          locale={{
            emptyText: <NoDataTable title='Không có kết quả phù hợp' />,
          }}
          rowSelection={{ ...rowSelection, selectedRowKeys }}
          columns={columns}
          rowKey='id'
          dataSource={dataNotifications?.data?.items}
          loading={loading}
          className={styles.table}
          onChange={onChangeFilterTable}
          onRow={(record) => {
            return {
              onClick: () => {
                refDrawerDetailNotification.current.onOpen(record?.id);
              },
            };
          }}
          pagination={{
            current: dataNotifications?.data?.page,
            total: dataNotifications?.data?.total,
            showSizeChanger: false,
            // onChange: (page: number) => onChange(page),
            pageSize: dataNotifications?.data?.pageSize,
          }}
        />
      </div>

      <DrawerAddNotification reloadList={run} ref={refDrawerAddNotification} />
      <ModalDeleteNotification reloadList={run} ref={refModalDeleteNotification} />
      <DrawerDetailNotification
        refModalDeleteNotification={refModalDeleteNotification}
        refDrawerAddNotification={refDrawerAddNotification}
        ref={refDrawerDetailNotification}
      />
      <ModalDeleteNotifications reloadList={run} ref={refModalDeleteNotifications} />
    </div>
  );
};
export default NotificationManagement;
