/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, useImperativeHandle, useState } from 'react';

import { Button as ButtonAntd, Row, Space } from 'antd';

import Button from '@components/UI/Button/Button';
import CustomModal from '@components/UI/CustomModal';

import styles from './index.module.scss';

interface IProps {
  reloadList: VoidFunction;
}

const ModalDeleteUsers = (props: IProps, ref: any) => {
  const { reloadList } = props;
  const [visible, setVisible] = useState(false);
  const [idsDelete, setIdsDelete] = useState<string[]>([]);
  // const requestDeleteNotification = useDeleteNotification({
  //   onSuccess: () => {
  //     onVisible();
  //     reloadList();
  //     openNotification('Delete notification successfully', 'success');
  //   },
  //   onError(e) {
  //     openNotification(e?.errors?.[0] || e?.message, 'error');
  //   },
  // });

  const onVisible = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return {
      onOpen: (id: string[]) => {
        setIdsDelete(id);
        setVisible(true);
      },
      onClose: () => setVisible(false),
    };
  });

  const onDelete = () => {
    // requestDeleteNotification.run(idDelete);
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
            <p className={styles.title}>{'Xoá tài khoản'}</p>
            <span className={styles.des}>Bạn có chắc chắn muốn xóa những tài khoản không ?</span>
          </Space>

          <Row align={'middle'} justify={'center'} style={{ gap: '12px', marginTop: '20px' }}>
            <ButtonAntd onClick={onVisible} className={styles.btn} size='large' type='default'>
              Không
            </ButtonAntd>
            <Button
              onClick={onDelete}
              // loading={requestDeleteNotification.loading}
              size='large'
              className={styles.btn}
              type='green'
            >
              Có
            </Button>
          </Row>
        </div>
      </CustomModal>
    </>
  );
};
export default forwardRef(ModalDeleteUsers);
