import { ReactElement } from 'react';

import dynamic from 'next/dynamic';

import MainLayout from '@layout/MainLayout';

const Statistics = dynamic(() => import('@components/Statistics'), {
  ssr: false,
});

const StatisticsPage = () => {
  return <Statistics />;
};

StatisticsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export default StatisticsPage;
