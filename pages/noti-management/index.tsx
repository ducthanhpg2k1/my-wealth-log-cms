import { ReactElement } from 'react';

import dynamic from 'next/dynamic';

import MainLayout from '@layout/MainLayout';

const NotificationManagement = dynamic(() => import('@components/NotificationManagement'), {
  ssr: false,
});

const NotificationManagementPage = () => {
  return <NotificationManagement />;
};

NotificationManagementPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export default NotificationManagementPage;
