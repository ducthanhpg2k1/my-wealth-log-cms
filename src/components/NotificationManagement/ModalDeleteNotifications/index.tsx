/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, useImperativeHandle, useState } from 'react';

import { Button as ButtonAntd, Row, Space } from 'antd';

import Button from '@components/UI/Button/Button';
import CustomModal from '@components/UI/CustomModal';
import { openNotification } from '@utils/common';

import styles from './index.module.scss';
import { useDeleteNotifications } from '../service';

interface IProps {
  reloadList: VoidFunction;
}

const ModalDeleteNotifications = (props: IProps, ref: any) => {
  const { reloadList } = props;
  const [visible, setVisible] = useState(false);
  const [idsDelete, setIdsDelete] = useState<string[]>([]);
  const requestDeleteNotifications = useDeleteNotifications({
    onSuccess: () => {
      onVisible();
      reloadList();
      openNotification('Xóa những thông báo đã chọn thành công', 'success');
    },
    onError(e) {
      openNotification(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const onVisible = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return {
      onOpen: (ids: string[]) => {
        setIdsDelete(ids);
        setVisible(true);
      },
      onClose: () => setVisible(false),
    };
  });

  const onDelete = () => {
    requestDeleteNotifications.run({ ids: idsDelete });
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
            <p className={styles.title}>{'Xoá thông báo'}</p>
            <span className={styles.des}>
              Bạn có chắc chắn muốn xóa những thông báo đã chọn không ?
            </span>
          </Space>

          <Row align={'middle'} justify={'center'} style={{ gap: '12px', marginTop: '20px' }}>
            <ButtonAntd onClick={onVisible} className={styles.btn} size='large' type='default'>
              Không
            </ButtonAntd>
            <Button
              onClick={onDelete}
              loading={requestDeleteNotifications.loading}
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
export default forwardRef(ModalDeleteNotifications);
