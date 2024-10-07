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
import Text from '@components/UI/Text';
import { isImage, openNotification } from '@utils/common';

import styles from './index.module.scss';
import {
  useCreateNotifications,
  useEditNotifications,
  useGetAllFrequencies,
  useUploadImage,
} from '../service';

const DrawerAddNotification = (props: any, ref: any) => {
  const { reloadList } = props;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataDetail, setDataDetail] = useState<any>({});
  const [dataUpload, setDataUpload] = useState<any>({});

  const { dataFrequencies } = useGetAllFrequencies();

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

  console.log(dataUpload, 'dataUpload');

  const { Dragger } = Upload;

  const onVisible = () => {
    setOpen(false);
    form.resetFields();
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
      if (info.file?.originFileObj) {
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
            hourSendAt: dayjs(data?.data?.hourSendAt),
            daySendAt: dayjs(data?.data?.daySendAt),
            repeat: data?.data?.repeat,
          });
          const fileName = data?.data?.image.split('/').pop();
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
    const formatteddaySendAt = values?.daySendAt ? dayjs(values?.daySendAt)?.toISOString() : null;

    const body = {
      name: values?.name,
      content: values?.content,
      frequencyId: values?.frequencyId,
      hourSendAt: formattedhourSendAt,
      daySendAt: formatteddaySendAt,
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
        <Form form={form} layout='vertical' onFinish={onSubmit}>
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
          <Row align={'top'} style={{ gap: '16px' }}>
            <Text type='font-14-400'>Tần suất:</Text>
            <Form.Item name='frequencyId' label={''}>
              <Radio.Group>
                <Space direction='vertical'>
                  {dataFrequencies?.data?.map((item: any) => {
                    return (
                      <Radio key={item?.code} value={item?.code}>
                        {item?.name}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </Form.Item>
          </Row>
          <Row align={'middle'} style={{ gap: '12px' }}>
            <Text type='font-14-400'>Thời gian gửi</Text>
            <Row align={'middle'} style={{ gap: '4px' }}>
              <Form.Item noStyle name='hourSendAt' label={''}>
                <TimePicker
                  style={{
                    maxWidth: '120px',
                  }}
                />
              </Form.Item>
              <Form.Item noStyle name='daySendAt' label={''}>
                <DatePicker />
              </Form.Item>
            </Row>
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
