/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, useImperativeHandle, useState } from 'react';

import { Button as ButtonAntd, Row, Space } from 'antd';

import Button from '@components/UI/Button/Button';
import CustomModal from '@components/UI/CustomModal';

import styles from './index.module.scss';

interface IProps {}

const ModalDeleteNotification = (props: IProps, ref: any) => {
  const {} = props;
  const [visible, setVisible] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

  const onVisible = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return {
      onOpen: (id: number) => {
        setIdDelete(id);
        setVisible(true);
      },
      onClose: () => setVisible(false),
    };
  });

  const onDelete = () => {};
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
            <p className={styles.title}>{'Xoá thông báo'}</p>
            <span className={styles.des}>Bạn có chắc chắn muốn xóa thông báo không ?</span>
          </Space>

          <Row align={'middle'} justify={'center'} style={{ gap: '12px', marginTop: '20px' }}>
            <ButtonAntd onClick={onVisible} className={styles.btn} size='large' type='default'>
              Không
            </ButtonAntd>
            <Button className={styles.btn} type='green'>
              Có
            </Button>
          </Row>
        </div>
      </CustomModal>
    </>
  );
};
export default forwardRef(ModalDeleteNotification);
