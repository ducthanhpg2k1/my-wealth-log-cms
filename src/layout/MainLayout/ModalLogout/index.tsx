/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, useImperativeHandle, useState } from 'react';

import { Button as ButtonAntd, Row, Space } from 'antd';
import { useRouter } from 'next/router';

import Button from '@components/UI/Button/Button';
import CustomModal from '@components/UI/CustomModal';
import { deleteAuthCookies } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

import styles from './index.module.scss';

interface IProps {}

const ModalLogout = (props: IProps, ref: any) => {
  const {} = props;
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const onVisible = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return {
      onOpen: () => {
        setVisible(true);
      },
      onClose: () => setVisible(false),
    };
  });

  const handleLogout = () => {
    deleteAuthCookies();
    router.push(ROUTE_PATH.SIGN_IN);
  };

  return (
    <>
      <CustomModal
        className={styles.modal}
        onCancel={onVisible}
        footer={undefined}
        visible={visible}
      >
        <div className={styles.wrap}>
          <Space direction='vertical' size={8}>
            <p className={styles.title}>{'Đăng xuất tài khoản'}</p>
            <span className={styles.des}>Bạn có chắc chắn muốn đăng xuất không?</span>
          </Space>

          <Row align={'middle'} justify={'center'} style={{ gap: '12px', marginTop: '20px' }}>
            <ButtonAntd onClick={onVisible} className={styles.btn} size='large' type='default'>
              Không
            </ButtonAntd>
            <Button onClick={handleLogout} size='large' className={styles.btn} type='green'>
              Có
            </Button>
          </Row>
        </div>
      </CustomModal>
    </>
  );
};
export default forwardRef(ModalLogout);
