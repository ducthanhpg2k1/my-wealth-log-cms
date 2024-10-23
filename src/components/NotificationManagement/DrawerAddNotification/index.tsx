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
  TimePicker,
  Upload,
} from 'antd';
import { UploadProps } from 'antd/lib';
import dayjs from 'dayjs';
import Image from 'next/image';

import Button from '@components/UI/Button/Button';
import InputText from '@components/UI/InputText';
import InputTextarea from '@components/UI/InputTextarea';
import SelectCustom from '@components/UI/SelectCustom';
import Text from '@components/UI/Text';
import { isImage, openNotification, TYPE_DATE, TYPE_DATE_SEND } from '@utils/common';

import styles from './index.module.scss';
import { useCreateNotifications, useEditNotifications, useUploadImage } from '../service';

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
  const [dataDetail, setDataDetail] = useState<any>({});
  const [dataUpload, setDataUpload] = useState<any>({});

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
    onChange(info) {
      if (!isImage(info?.file)) {
        return;
      }
      if (info.file.status === 'done' && info.file?.originFileObj) {
        const file = info.file.originFileObj;
        requestUploadImage?.run(file, 'notification');
      }
    },
  };

  useImperativeHandle(ref, () => {
    return {
      onOpen: (data: any) => {
        setOpen(true);
        setDataDetail(data?.data);

        if (data?.data?.id) {
          form.setFieldsValue({
            name: data?.data?.name,
            content: data?.data?.content,
            frequencyId: data?.data?.frequencyId?.code,
            hourSendAt: data?.data?.hourSendAt ? dayjs(data?.data?.hourSendAt) : dayjs(),
            sendAt: data?.data?.sendAt ? dayjs(data?.data?.sendAt) : dayjs(),
            daySendAt: data?.data?.daySendAt,
            repeat: data?.data?.repeat,
          });
          const fileName = data?.data?.image?.split('/')?.pop();
          setDataUpload({
            url: data?.data?.image,
            fileName,
          });
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

    const body = {
      name: values?.name,
      content: values?.content,
      frequencyId: values?.frequencyId,
      hourSendAt: formattedhourSendAt,
      daySendAt: values?.daySendAt,
      sendAt: formatteddaySendAt,
      repeat: values?.repeat,
      image: dataUpload?.url,
    };
    if (dataDetail?.id) {
      requestEditNotifications.run(body, dataDetail?.id);
    } else {
      requestCreateNotifications?.run(body);
    }
  };
  const handleRemoveFile = () => {
    setDataUpload({});
  };

  return (
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
          {dataDetail?.id ? 'Sửa thông báo' : 'Thêm mới thông báo'}
        </Text>
        <ButtonAntd
          shape='circle'
          type='text'
          size='middle'
          onClick={() => {
            setOpen(false);
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
            label={'Tên đăng nhập'}
          >
            <InputText maxLength={225} size='large' placeholder='Tên thông báo' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Vui lòng nhập nội dung thông báo' }]}
            name='content'
            label={'Nội dung thông báo'}
          >
            <InputTextarea maxLength={500} rows={5} size='large' placeholder='Nội dung thông báo' />
          </Form.Item>
          <div className={styles.contentUpload}>
            <Text type='font-14-400'>Hình ảnh đính kèm</Text>
            <Space direction='vertical' size={12}>
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
                    Tải ảnh lên (1/1)
                  </Text>
                  <Text color='neutral-800' type='font-12-400'>
                    JPG, JPEG, PNG tối đa 10MB
                  </Text>
                </Space>
              </Dragger>
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
            <Form.Item dependencies={['frequencyId', 'repeat']} noStyle>
              {({ getFieldValue }) => {
                const frequencyId = getFieldValue('frequencyId');
                const repeat = getFieldValue('repeat');
                console.log({ frequencyId, repeat });

                if (!repeat || (repeat && frequencyId === TYPE_DATE.MONTHLY)) {
                  return (
                    <Col span={10}>
                      <Form.Item name='sendAt' label={'Thời gian gửi'}>
                        <DatePicker
                          showTime={{ format: 'HH:mm' }}
                          style={{
                            width: '100%',
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
  );
};
export default forwardRef(DrawerAddNotification);
