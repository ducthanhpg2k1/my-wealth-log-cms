/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable require-await */
/* eslint-disable no-console */
import { forwardRef, useImperativeHandle, useState } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Button as ButtonAntd, Col, Drawer, Row, Space } from 'antd';
import Image from 'next/image';

import Button from '@components/UI/Button/Button';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

const DrawerDetailNotification = (props: any, ref: any) => {
  const { refDrawerAddNotification, refModalDeleteNotification } = props;
  const [open, setOpen] = useState(false);
  const [idDetail, setIdDetail] = useState<any>('');

  const onVisible = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => {
    return {
      onOpen: (id: string) => {
        setOpen(true);
        setIdDetail(id);
      },
      onClose: () => setOpen(false),
    };
  });

  return (
    <Drawer
      className={styles.drawer}
      placement={'right'}
      closable={false}
      width={592}
      onClose={onVisible}
      open={open}
    >
      <div className={styles.container}>
        <Row align='middle' justify='space-between' className={styles.header}>
          <Text color='text-primary' type='font-24-600'>
            Chi tiết thông báo
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
          <Row align={'middle'}>
            <Col span={8}>
              <Text type='font-14-400' color='neutral-700'>
                Tên thông báo
              </Text>
            </Col>
            <Col span={16}>
              <Text type='font-14-400' color='text-primary'>
                Thông báo 01
              </Text>
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={8}>
              <Text type='font-14-400' color='neutral-700'>
                Nội dung thông báo
              </Text>
            </Col>
            <Col span={16}>
              <Text type='font-14-400' color='text-primary'>
                Lorem ipsum dolor sit amet consectetur. Ac nibh et urna volutpat non malesuada.
              </Text>
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={8}>
              <Text type='font-14-400' color='neutral-700'>
                Tần suất
              </Text>
            </Col>
            <Col span={16}>
              <Text type='font-14-400' color='text-primary'>
                Hàng tháng
              </Text>
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={8}>
              <Text type='font-14-400' color='neutral-700'>
                Hình ảnh đính kèm
              </Text>
            </Col>
            <Col span={16}>
              <div className={styles.contentImage}>
                <Row align={'middle'} style={{ gap: '12px' }}>
                  <Image
                    src={'/images/img-content.png'}
                    alt=''
                    width={56}
                    height={56}
                    style={{
                      width: '56px',
                      height: '56px',
                    }}
                  />
                  <Text type='font-14-400' color='text-primary'>
                    event-image01.png
                  </Text>
                </Row>
              </div>
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={8}>
              <Text type='font-14-400' color='neutral-700'>
                Thời gian gửi
              </Text>
            </Col>
            <Col span={16}>
              <Space size={12}>
                <Row align={'middle'} style={{ gap: '4px' }}>
                  <Image
                    src='/svgIcon/ic-date.svg'
                    width={20}
                    height={20}
                    style={{
                      width: '20px',
                      height: '20px',
                    }}
                    alt=''
                  />
                  <Text type='font-14-400' color='text-primary'>
                    12:00 AM
                  </Text>
                </Row>
                <Text type='font-14-400' color='text-primary'>
                  -
                </Text>
                <Text type='font-14-400' color='text-primary'>
                  01/01/2011
                </Text>
              </Space>
            </Col>
          </Row>
        </div>
        <div className={styles.footerAction}>
          <ButtonAntd
            onClick={() => refModalDeleteNotification.current.onOpen(idDetail)}
            size='large'
            className={styles.btn}
            type='default'
          >
            Xóa
          </ButtonAntd>
          <Button
            onClick={() => {
              refDrawerAddNotification.current.onOpen(idDetail);
              onVisible();
            }}
            className={styles.btn}
            type='green'
          >
            Sửa
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
export default forwardRef(DrawerDetailNotification);
