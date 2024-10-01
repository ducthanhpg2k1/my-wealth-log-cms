import Image from 'next/image';

import styles from './index.module.scss';
import Text from '../Text';

const NoDataTable = () => {
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
        Không có kết quả phù hợp
      </Text>
    </div>
  );
};
export default NoDataTable;
