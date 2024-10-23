/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
/* eslint-disable linebreak-style */
/* eslint-disable multiline-ternary */
/* eslint-disable linebreak-style */
import { useMemo } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import { expandedAtom } from '..';
import styles from './index.module.scss';

const MENUS = [
  {
    id: 1,
    label: 'Quản lý người dùng',
    href: ROUTE_PATH.USER,
  },
  {
    id: 2,
    label: 'Quản lý thông báo',
    href: ROUTE_PATH.NOTI_MANAGEMENT,
  },
  {
    id: 3,
    label: 'Thống kê',
    href: ROUTE_PATH.STATISTICS,
  },
];

const Siderbar = () => {
  const router = useRouter();
  const [isExpanded] = useAtom(expandedAtom);

  const renderIcon = (url: string, active: boolean) => {
    if (url === ROUTE_PATH.USER) {
      return (
        <>
          {active ? (
            <Image
              className={styles.icon}
              src={'/svgIcon/ic-user-active.svg'}
              width={24}
              height={24}
              alt=''
            />
          ) : (
            <Image
              className={styles.icon}
              src={'/svgIcon/ic-user.svg'}
              width={24}
              height={24}
              alt=''
            />
          )}
        </>
      );
    }
    if (url === ROUTE_PATH.NOTI_MANAGEMENT) {
      return (
        <>
          {active ? (
            <Image
              className={styles.icon}
              src={'/svgIcon/ic-notifications-active.svg'}
              width={24}
              height={24}
              alt=''
            />
          ) : (
            <Image
              className={styles.icon}
              src={'/svgIcon/ic-notifications.svg'}
              width={24}
              height={24}
              alt=''
            />
          )}
        </>
      );
    }
    if (url === ROUTE_PATH.STATISTICS) {
      return (
        <>
          {active ? (
            <Image
              className={styles.icon}
              src={'/svgIcon/ic-donut-active.svg'}
              width={24}
              height={24}
              alt=''
            />
          ) : (
            <Image
              className={styles.icon}
              src={'/svgIcon/ic-donut.svg'}
              width={24}
              height={24}
              alt=''
            />
          )}
        </>
      );
    }
  };

  const pathName = useMemo(() => {
    return router.pathname;
  }, [router]);
  const handleRedirectPage = (url: string) => {
    router.push(url);
  };
  return (
    <div
      className={classNames(styles.container, {
        [styles.collapsed]: !isExpanded,
      })}
    >
      <div
        className={classNames(styles.header, {
          [styles.collapsedHeader]: !isExpanded,
        })}
      >
        <Image
          className={styles.image}
          width={32}
          height={28}
          src='/images/logo-green.png'
          alt=''
        />
        {isExpanded && <Text type='font-14-400'>My Wealth Log</Text>}
      </div>
      <div
        className={classNames(styles.content, {
          [styles.collapsedContent]: !isExpanded,
        })}
      >
        {MENUS?.map((item) => {
          return (
            <div
              onClick={() => handleRedirectPage(item?.href)}
              key={item?.id}
              className={classNames(styles.menu, {
                [styles.menuActive]: item?.href === pathName,
              })}
            >
              <>{renderIcon(item?.href, item?.href === pathName)}</>
              {isExpanded && (
                <Text type='font-14-400' color='text-primary'>
                  {item?.label}
                </Text>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Siderbar;
