import { ReactElement } from 'react';

import dynamic from 'next/dynamic';

import MainLayout from '@layout/MainLayout';

const User = dynamic(() => import('@components/User'), {
  ssr: false,
});

const UserPage = () => {
  return <User />;
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export default UserPage;
