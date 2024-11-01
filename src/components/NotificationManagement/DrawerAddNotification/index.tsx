/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable padded-blocks */
/* eslint-disable no-void */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable require-await */
/* eslint-disable no-console */
import { forwardRef, useImperativeHandle, useState } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import {
  Button as ButtonAntd,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Form,
  Radio,
  Row,
  Space,
  Spin,
  TimePicker,
  Upload,
} from 'antd';
import { UploadProps } from 'antd/lib';
import dayjs from 'dayjs';
import Image from 'next/image';

import 'dayjs/locale/vi';
import Button from '@components/UI/Button/Button';
import InputText from '@components/UI/InputText';
import InputTextarea from '@components/UI/InputTextarea';
import SelectCustom from '@components/UI/SelectCustom';
import Text from '@components/UI/Text';
import {
  DATE_SEND,
  isImage,
  openNotification,
  TIME_SEND,
  TYPE_DATE,
  TYPE_DATE_SEND,
} from '@utils/common';

import styles from './index.module.scss';
import {
  useCreateNotifications,
  useEditNotifications,
  useGetDetailNotification,
  useUploadImage,
} from '../service';

dayjs.locale('vi');
export const DATA_DATE_SEND = [
  {
    label: 'Thứ 2',
    value: TYPE_DATE_SEND.MONDAY,
  },
  {
    label: 'Thứ 3',
    value: TYPE_DATE_SEND.TUESDAY,
  },
  {
    label: 'Thứ 4',
    value: TYPE_DATE_SEND.WEBNESDAY,
  },
  {
    label: 'Thứ 5',
    value: TYPE_DATE_SEND.THURSDAY,
  },
  {
    label: 'Thứ 6',
    value: TYPE_DATE_SEND.FRIDAY,
  },
  {
    label: 'Thứ 7',
    value: TYPE_DATE_SEND.SATURDAY,
  },
  {
    label: 'Chủ nhật',
    value: TYPE_DATE_SEND.SUNDAY,
  },
];

const dataFrequencies = [
  {
    id: 1,
    label: 'Hàng ngày',
    value: TYPE_DATE.DAILY,
  },
  {
    id: 2,
    label: 'Hàng tháng',
    value: TYPE_DATE.MONTHLY,
  },
  {
    id: 3,
    label: 'Hàng tuần',
    value: TYPE_DATE.WEEKLY,
  },
];

const DrawerAddNotification = (props: any, ref: any) => {
  const { reloadList } = props;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [idEdit, setIdEdit] = useState<any>({});
  const [dataUpload, setDataUpload] = useState<any>({});

  const { run: runGetDetail, loading } = useGetDetailNotification({
    onSuccess: (res) => {
      form.setFieldsValue({
        name: res?.data?.name,
        content: res?.data?.content,
        frequencyId: res?.data?.frequencyId?.code,
        hourSendAt: res?.data?.hourSendAt ? dayjs(res?.data?.hourSendAt) : dayjs(),
        sendAt: res?.data?.sendAt ? dayjs(res?.data?.sendAt) : dayjs(),
        daySendAt: res?.data?.daySendAt || TYPE_DATE_SEND.MONDAY,
        repeat: res?.data?.repeat,
        sendDate:
          res?.data?.frequencyId?.code === TYPE_DATE.MONTHLY && dayjs(res?.data?.sendAt).date(),
        sendTime:
          res?.data?.frequencyId?.code === TYPE_DATE.MONTHLY && dayjs(res?.data?.sendAt).hour(),
      });
      const fileName = res?.data?.image?.split('/')?.pop();
      setDataUpload({
        url: res?.data?.image,
        fileName,
      });
    },
  });

  const requestCreateNotifications = useCreateNotifications({
    onSuccess: () => {
      onVisible();
      form.resetFields();
      reloadList();
      openNotification('Thêm mới thông báo thành công', 'success');
    },
    onError(e) {
      openNotification(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const requestEditNotifications = useEditNotifications({
    onSuccess: () => {
      onVisible();
      form.resetFields();
      reloadList();
      openNotification('Sửa thông báo thành công', 'success');
    },
    onError(e) {
      openNotification(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const requestUploadImage = useUploadImage({
    onSuccess: (res) => {
      const fileName = res?.fileUrl.split('/').pop();
      const newData = {
        url: res?.fileUrl,
        fileName,
      };
      setDataUpload(newData);
    },
    onError(e) {
      openNotification(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const { Dragger } = Upload;

  const onVisible = () => {
    setOpen(false);
    form.resetFields();
    setDataUpload({});
  };
  const propsUpload: UploadProps = {
    name: 'file',
    accept: '.jpg, .jpeg, .png',
    multiple: false,
    showUploadList: false,
    beforeUpload(file) {
      const maxSize = 10 * 1024 * 1024;
      if (!isImage(file)) {
        return;
      }

      if (file.size > maxSize) {
        openNotification('Chỉ cho phép upload file <=10MB ', 'error');
        return false;
      }
      requestUploadImage?.run(file, 'notification');

      return false;
    },
  };

  useImperativeHandle(ref, () => {
    return {
      onOpen: (id: string) => {
        setOpen(true);
        setIdEdit(id);
        setDataUpload({});
        if (id) {
          runGetDetail(id);
        }
      },
      onClose: () => setOpen(false),
    };
  });
  const onSubmit = async (values: any) => {
    const formattedhourSendAt = values?.hourSendAt
      ? dayjs(values?.hourSendAt)?.toISOString()
      : null;
    const formatteddaySendAt = values?.sendAt ? dayjs(values?.sendAt)?.toISOString() : null;

    const sendAtTypeMonth = dayjs()
      .set('date', values.sendDate)
      .set('hour', values.sendTime)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0);

    const body = {
      name: values?.name,
      content: values?.content,
      frequencyId: values?.frequencyId || null,
      hourSendAt: formattedhourSendAt,
      daySendAt: values?.daySendAt,
      sendAt:
        values?.frequencyId === TYPE_DATE.MONTHLY
          ? sendAtTypeMonth?.toISOString()
          : formatteddaySendAt,
      repeat: values?.repeat,
      image: dataUpload?.url || '',
    };

    if (idEdit) {
      requestEditNotifications.run(body, idEdit);
    } else {
      requestCreateNotifications?.run(body);
    }
  };
  const handleRemoveFile = () => {
    setDataUpload({});
  };

  return (
    <Spin spinning={loading}>
      <Drawer
        className={styles.drawer}
        placement={'right'}
        closable={false}
        width={592}
        onClose={onVisible}
        open={open}
      >
        <Row align='middle' justify='space-between' className={styles.header}>
          <Text color='text-primary' type='font-24-600'>
            {idEdit ? 'Sửa thông báo' : 'Thêm mới thông báo'}
          </Text>
          <ButtonAntd
            shape='circle'
            type='text'
            size='middle'
            onClick={() => {
              setOpen(false);
              onVisible();
            }}
            icon={<CloseOutlined />}
          />
        </Row>
        <div className={styles.content}>
          <Form
            initialValues={{
              repeat: false,
              sendAt: dayjs(),
              hourSendAt: dayjs(),
              daySendAt: TYPE_DATE_SEND.MONDAY,
              frequencyId: TYPE_DATE.WEEKLY,
            }}
            form={form}
            layout='vertical'
            onFinish={onSubmit}
          >
            <Form.Item
              rules={[{ required: true, message: 'Vui lòng nhập tên thông báo' }]}
              name='name'
              label={'Tên thông báo'}
            >
              <InputText maxLength={255} size='large' placeholder='Tên thông báo' />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'Vui lòng nhập nội dung thông báo' }]}
              name='content'
              label={'Nội dung thông báo'}
            >
              <InputTextarea
                maxLength={500}
                rows={5}
                size='large'
                placeholder='Nội dung thông báo'
              />
            </Form.Item>
            <div className={styles.contentUpload}>
              <Text type='font-14-400'>Hình ảnh đính kèm</Text>
              <Space direction='vertical' size={12}>
                <Spin spinning={requestUploadImage.loading}>
                  <Dragger className={styles.dragger} {...propsUpload}>
                    <Space direction='vertical' size={4}>
                      <Image
                        src={'/images/img-upload.png'}
                        alt=''
                        width={32}
                        height={32}
                        className={styles.imgUpload}
                      />
                      <Text type='font-14-400' color='text-primary'>
                        {`Tải ảnh lên (${dataUpload?.fileName ? 1 : 0}/1)`}
                      </Text>
                      <Text color='neutral-800' type='font-12-400'>
                        JPG, JPEG, PNG tối đa 10MB
                      </Text>
                    </Space>
                  </Dragger>
                </Spin>
                {dataUpload?.url && (
                  <>
                    <Row align={'middle'} justify={'space-between'}>
                      <Text type='font-14-400'>{dataUpload?.fileName}</Text>
                      <ButtonAntd
                        shape='circle'
                        type='text'
                        size='small'
                        onClick={() => handleRemoveFile()}
                        icon={<CloseOutlined />}
                      />
                    </Row>
                  </>
                )}
              </Space>
            </div>
            <Form.Item valuePropName='checked' name='repeat' label={''}>
              <Checkbox>Lặp lại</Checkbox>
            </Form.Item>
            <Form.Item dependencies={['repeat']} noStyle>
              {({ getFieldValue }) => {
                const isRepeat = getFieldValue('repeat');
                return (
                  <>
                    {isRepeat && (
                      <Row align={'top'} style={{ gap: '16px' }}>
                        <Text type='font-14-400'>Tần suất:</Text>
                        <Form.Item name='frequencyId' label={''}>
                          <Radio.Group defaultValue={TYPE_DATE.WEEKLY}>
                            <Space direction='vertical'>
                              {dataFrequencies?.map((item: any) => {
                                return (
                                  <Radio key={item?.id} value={item?.value}>
                                    {item?.label}
                                  </Radio>
                                );
                              })}
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Row>
                    )}
                  </>
                );
              }}
            </Form.Item>
            <Row gutter={12}>
              <Form.Item dependencies={['frequencyId', 'repeat']} noStyle>
                {({ getFieldValue }) => {
                  const frequencyId = getFieldValue('frequencyId');
                  const repeat = getFieldValue('repeat');

                  if (repeat && frequencyId === TYPE_DATE.DAILY) {
                    return (
                      <Col span={8}>
                        <Form.Item name='hourSendAt' label={'Giờ gửi thông báo'}>
                          <TimePicker
                            defaultValue={dayjs()}
                            format='HH:mm'
                            style={{
                              width: '100%',
                            }}
                          />
                        </Form.Item>
                      </Col>
                    );
                  }

                  return null;
                }}
              </Form.Item>
              <Form.Item dependencies={['repeat']} noStyle>
                {({ getFieldValue }) => {
                  const repeat = getFieldValue('repeat');

                  if (!repeat) {
                    return (
                      <Col span={8}>
                        <Form.Item name='sendAt' label={'Thời gian gửi'}>
                          <DatePicker
                            showTime={{ format: 'HH:mm' }}
                            style={{
                              width: '100%',
                            }}
                            format='DD-MM-YYYY HH:mm'
                            disabledDate={(current) => {
                              return current && current < dayjs().startOf('day');
                            }}
                            disabledTime={(current) => {
                              if (current && current.isSame(dayjs(), 'day')) {
                                return {
                                  disabledHours: () =>
                                    Array.from({ length: dayjs().hour() }, (_, i) => i),
                                  disabledMinutes: () =>
                                    Array.from({ length: dayjs().minute() }, (_, i) => i),
                                };
                              }
                              return {};
                            }}
                            defaultValue={dayjs()}
                          />
                        </Form.Item>
                      </Col>
                    );
                  }
                  return null;
                }}
              </Form.Item>

              <Form.Item dependencies={['frequencyId', 'repeat']} noStyle>
                {({ getFieldValue }) => {
                  const frequencyId = getFieldValue('frequencyId');
                  const repeat = getFieldValue('repeat');

                  if (repeat && frequencyId === TYPE_DATE.MONTHLY) {
                    return (
                      <>
                        <Col span={8}>
                          <Form.Item name='sendTime' label={'Thời gian gửi'}>
                            <SelectCustom
                              suffixIcon={<IconTimeDate />}
                              options={TIME_SEND}
                              size='middle'
                              placeholder='Thời gian gửi'
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name='sendDate' label={'Ngày gửi'}>
                            <SelectCustom
                              options={DATE_SEND}
                              size='middle'
                              placeholder='Ngày gửi'
                            />
                          </Form.Item>
                        </Col>
                      </>
                    );
                  }
                  return null;
                }}
              </Form.Item>
              <Form.Item dependencies={['frequencyId', 'repeat']} noStyle>
                {({ getFieldValue }) => {
                  const frequencyId = getFieldValue('frequencyId');
                  const repeat = getFieldValue('repeat');

                  if (repeat && frequencyId === TYPE_DATE.WEEKLY) {
                    return (
                      <Col span={8}>
                        <Form.Item name='daySendAt' label={'Ngày gửi thông báo'}>
                          <SelectCustom
                            options={DATA_DATE_SEND}
                            size='middle'
                            defaultValue={TYPE_DATE_SEND.MONDAY}
                          />
                        </Form.Item>
                      </Col>
                    );
                  }

                  return null;
                }}
              </Form.Item>
            </Row>

            <div className={styles.footerAction}>
              <ButtonAntd
                onClick={() => setOpen(false)}
                size='large'
                className={styles.btn}
                type='default'
              >
                Hủy bỏ
              </ButtonAntd>
              <Button
                size='large'
                htmlType='submit'
                loading={requestCreateNotifications?.loading || requestEditNotifications?.loading}
                className={styles.btn}
                type='green'
              >
                Lưu
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>
    </Spin>
  );
};
export default forwardRef(DrawerAddNotification);

const IconTimeDate = () => {
  return (
    <svg
      viewBox='64 64 896 896'
      focusable='false'
      data-icon='clock-circle'
      width='1em'
      height='1em'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'></path>
      <path d='M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z'></path>
    </svg>
  );
};
