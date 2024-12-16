import { ReactElement } from 'react';

import dynamic from 'next/dynamic';

import MainLayout from '@layout/MainLayout';

const PageManagement = dynamic(() => import('@components/PageManagement'), {
  ssr: false,
});

const PageManagementPage = () => {
  return <PageManagement />;
};

PageManagementPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export default PageManagementPage;
