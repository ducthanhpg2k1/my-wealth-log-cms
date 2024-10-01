import { useMemo } from 'react';

import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import styles from './index.module.scss';
import Siderbar from './Siderbar';

const MainLayout = ({ children }: any) => {
  const router = useRouter();

  const pathName = useMemo(() => {
    return router.pathname;
  }, [router]);

  return (
    <div className={styles.container}>
      <Siderbar />
      <div className={styles.contentMain}>
        <div className={styles.headerMain}>
          <div className={styles.profile}>
            <Space>
              <Avatar size={32} icon={<UserOutlined />} />
              <Text color='text-primary' type='font-14-400'>
                Nguyen Nguyen
              </Text>
            </Space>
            <CaretDownOutlined
              style={{
                color: '#828282',
              }}
              size={24}
            />
          </div>
        </div>
        <div
          className={classNames(styles.containerMain, {
            [styles.menuActcontainerMainStatistics]: pathName === ROUTE_PATH.STATISTICS,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
