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
import Image from 'next/image';

import Button from '@components/UI/Button/Button';
import InputText from '@components/UI/InputText';
import InputTextarea from '@components/UI/InputTextarea';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

const DrawerAddNotification = (props: any, ref: any) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [idEdit, setIdEdit] = useState<any>('');

  const { Dragger } = Upload;

  const onVisible = () => {
    setOpen(false);
  };
  const propsUpload: UploadProps = {
    name: 'file',
    accept: '.jpg, .jpeg, .png',
    onChange(info) {
      console.log(info.file, info.fileList);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  useImperativeHandle(ref, () => {
    return {
      onOpen: (id: string) => {
        console.log(id, 'id');

        setOpen(true);
        setIdEdit(id);
      },
      onClose: () => setOpen(false),
    };
  });
  const onSubmit = async (values: any) => {
    console.log(values);
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
          {idEdit ? 'Sửa thông báo' : 'Thêm mới thông báo'}
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
            <InputText size='large' placeholder='Tên thông báo' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Vui lòng nhập nội dung thông báo' }]}
            name='content'
            label={'Nội dung đăng nhập'}
          >
            <InputTextarea rows={5} size='large' placeholder='Nội dung thông báo' />
          </Form.Item>
          <div className={styles.contentUpload}>
            <Text type='font-14-400'>Hình ảnh đính kèm</Text>
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
          </div>
          <Form.Item valuePropName='checked' name='repeat' label={''}>
            <Checkbox>Lặp lại</Checkbox>
          </Form.Item>
          <Row align={'top'} style={{ gap: '16px' }}>
            <Text type='font-14-400'>Tần suất:</Text>
            <Form.Item name='repeat_weekly' label={''}>
              <Radio.Group>
                <Space direction='vertical'>
                  <Radio value={1}>Hàng ngày</Radio>
                  <Radio value={2}>Hàng tuần</Radio>
                  <Radio value={3}>Hàng tháng</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Row>
          <Row align={'middle'} style={{ gap: '12px' }}>
            <Text type='font-14-400'>Thời gian gửi</Text>
            <Row align={'middle'} style={{ gap: '4px' }}>
              <Form.Item noStyle name='time' label={''}>
                <TimePicker
                  style={{
                    maxWidth: '120px',
                  }}
                />
              </Form.Item>
              <Form.Item noStyle name='date' label={''}>
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
            <Button className={styles.btn} type='green'>
              Lưu
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};
export default forwardRef(DrawerAddNotification);
