/* eslint-disable no-mixed-operators */
/* eslint-disable indent */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable require-await */
/* eslint-disable no-console */
import { forwardRef, useImperativeHandle, useState } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Button as ButtonAntd, Drawer, Row } from 'antd';

import Text from '@components/UI/Text';

import styles from './index.module.scss';
import OltherInformation from './OltherInformation';
import PersonalInformation from './PersonalInformation';

const DrawerDetailUser = (props: any, ref: any) => {
  const [open, setOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState<any>({});

  const onVisible = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => {
    return {
      onOpen: (data: any) => {
        setDataDetail(data);
        setOpen(true);
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
            Chi tiết người dùng
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
          <PersonalInformation dataDetail={dataDetail} />
          <OltherInformation dataDetail={dataDetail} />
        </div>
      </div>
    </Drawer>
  );
};
export default forwardRef(DrawerDetailUser);

export const IconTime = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
      <path
        d='M11.7498 12.9166L12.9165 11.75L9.83317 8.66663V4.83329H8.1665V9.33329L11.7498 12.9166ZM8.99984 17.3333C7.84706 17.3333 6.76373 17.1145 5.74984 16.677C4.73595 16.2395 3.854 15.6458 3.104 14.8958C2.354 14.1458 1.76025 13.2638 1.32275 12.25C0.885254 11.2361 0.666504 10.1527 0.666504 8.99996C0.666504 7.84718 0.885254 6.76385 1.32275 5.74996C1.76025 4.73607 2.354 3.85413 3.104 3.10413C3.854 2.35413 4.73595 1.76038 5.74984 1.32288C6.76373 0.885376 7.84706 0.666626 8.99984 0.666626C10.1526 0.666626 11.2359 0.885376 12.2498 1.32288C13.2637 1.76038 14.1457 2.35413 14.8957 3.10413C15.6457 3.85413 16.2394 4.73607 16.6769 5.74996C17.1144 6.76385 17.3332 7.84718 17.3332 8.99996C17.3332 10.1527 17.1144 11.2361 16.6769 12.25C16.2394 13.2638 15.6457 14.1458 14.8957 14.8958C14.1457 15.6458 13.2637 16.2395 12.2498 16.677C11.2359 17.1145 10.1526 17.3333 8.99984 17.3333ZM8.99984 15.6666C10.8471 15.6666 12.42 15.0173 13.7186 13.7187C15.0172 12.4201 15.6665 10.8472 15.6665 8.99996C15.6665 7.15274 15.0172 5.57982 13.7186 4.28121C12.42 2.9826 10.8471 2.33329 8.99984 2.33329C7.15261 2.33329 5.5797 2.9826 4.28109 4.28121C2.98248 5.57982 2.33317 7.15274 2.33317 8.99996C2.33317 10.8472 2.98248 12.4201 4.28109 13.7187C5.5797 15.0173 7.15261 15.6666 8.99984 15.6666Z'
        fill='#828282'
      />
    </svg>
  );
};
