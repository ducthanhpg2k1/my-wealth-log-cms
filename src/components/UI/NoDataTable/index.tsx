import { PlusOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import Image from 'next/image';

import styles from './index.module.scss';
import Button from '../Button/Button';
import Text from '../Text';

const NoDataTable = ({
  title,
  actionButton,
  handleActionButton,
}: {
  handleActionButton?: VoidFunction;
  title: string;
  actionButton?: boolean;
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={'/images/img-no-data.png'}
        alt=''
        width={147}
        height={90}
        className={styles.img}
      />
      <Text type='font-14-400' color='neutral-400'>
        {title}
      </Text>
      {actionButton && (
        <Button onClick={handleActionButton} className={styles.btnSearch} type='blue'>
          <Row align={'middle'} style={{ gap: '8px' }}>
            <PlusOutlined size={24} />
            <Text color='background-default' type='font-14-400'>
              Thêm mới
            </Text>
          </Row>
        </Button>
      )}
    </div>
  );
};
export default NoDataTable;
