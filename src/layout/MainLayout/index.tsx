/* eslint-disable unicorn/consistent-function-scoping */
import { useMemo, useRef } from 'react';

import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';
import { MenuProps } from 'antd/lib';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';
import { useProfile } from '@store/profile/useProfile';
import { ROUTE_PATH } from '@utils/common';

import styles from './index.module.scss';
import ModalLogout from './ModalLogout';
import Siderbar from './Siderbar';

const MainLayout = ({ children }: any) => {
  const router = useRouter();
  const refModalLogout: any = useRef();
  const { profile } = useProfile();

  const pathName = useMemo(() => {
    return router.pathname;
  }, [router]);

  const onClickProfile: MenuProps['onClick'] = ({ key }) => {
    if (key === 'log_out') {
      refModalLogout.current.onOpen();
    }
  };

  const profileSettings: MenuProps['items'] = [
    {
      key: 'log_out',
      label: <p>Đăng xuất</p>,
      icon: (
        <Image
          src='/svgIcon/ic-logout.svg'
          width={24}
          height={24}
          alt=''
          className={styles.iconLogOut}
        />
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Siderbar />
      <div className={styles.contentMain}>
        <div className={styles.headerMain}>
          <Dropdown
            placement='bottomRight'
            arrow
            trigger={['click']}
            menu={{ items: profileSettings, onClick: onClickProfile }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <div className={styles.profile}>
                <Space>
                  <Avatar size={32} icon={<UserOutlined />} />
                  <Text color='text-primary' type='font-14-400'>
                    {profile?.displayName ||
                      profile?.username ||
                      profile?.phoneNumber ||
                      profile?.email ||
                      '-'}
                  </Text>
                </Space>
                <CaretDownOutlined
                  style={{
                    color: '#828282',
                  }}
                  size={24}
                />
              </div>
            </a>
          </Dropdown>
        </div>
        <div
          className={classNames(styles.containerMain, {
            [styles.menuActcontainerMainStatistics]: pathName === ROUTE_PATH.STATISTICS,
          })}
        >
          {children}
        </div>
      </div>
      <ModalLogout ref={refModalLogout} />
    </div>
  );
};

export default MainLayout;
