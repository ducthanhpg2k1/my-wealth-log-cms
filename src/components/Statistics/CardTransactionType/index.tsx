/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable multiline-ternary */
import { useMemo } from 'react';

import { Row, Space } from 'antd';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Image from 'next/image';
import { Doughnut } from 'react-chartjs-2';

import Text from '@components/UI/Text';
import { isAllZero } from '@utils/common';

import styles from './index.module.scss';

ChartJS.register(
  ChartDataLabels,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const CardTransactionType = ({ data }: { data: any }) => {
  const isNoData = useMemo(() => {
    return isAllZero(data);
  }, [data]);

  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? (value / total) * 100 : 0;
  };

  const DATA_NOTE = [
    {
      id: 1,
      text: 'Giao dịch thu nhập',
      bgColor: '#17B899',
      value: data?.income,
    },
    {
      id: 2,
      text: 'Giao dịch chi phí',
      bgColor: '#F08C8C',
      value: data?.expense,
    },
    {
      id: 3,
      text: 'Giao dịch thu chi',
      bgColor: '#23B9E4',
      value: data?.income_expenditure,
    },
    {
      id: 4,
      text: 'Giao dịch điều chuyển',
      bgColor: '#FDD76D',
      value: data?.transfer,
    },
  ];

  const totalValue = [data?.income, data?.expense, data?.income_expenditure, data?.transfer];

  const doughnutOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const dataset = context.dataset;
            const total = dataset.data.reduce((acc: number, data: number) => acc + data, 0);
            const value = dataset.data[context.dataIndex];
            const percentage = calculatePercentage(value, total);
            return `${context.label}: ${value} (${percentage.toFixed(1)}%)`;
          },
        },
      },
      datalabels: {
        formatter: (value: number, ctx: any) => {
          const dataset = ctx.dataset;
          const total = dataset.data.reduce((acc: any, data: any) => acc + data, 0);
          const percentage = calculatePercentage(value, total);
          return `${percentage.toFixed(1)}%`;
        },
        color: '#333333',
        font: {
          size: 10,
          weight: 'bold',
        },
        anchor: 'center',
        align: 'center',
        display: (ctx: any) => {
          const dataset = ctx.dataset;
          const total = dataset.data.reduce((acc: number, data: number) => acc + data, 0);
          const value = dataset.data[ctx.dataIndex];
          const percentage = calculatePercentage(value, total);

          return percentage > 20;
        },
      },
    },
  };
  const transactionTypeData = {
    labels: [
      'Giao dịch chi phí',
      'Giao dịch thu nhập',
      'Giao dịch thu chi',
      'Giao dịch điều chuyển',
    ],
    datasets: [
      {
        data: [data?.expense, data?.income, data?.income_expenditure, data?.transfer],
        backgroundColor: ['#F08C8C', '#17B899', '#23B9E4', '#FDD76D'],
      },
    ],
  };

  return (
    <div className={styles.card}>
      <Text type='font-18-600' color='text-primary'>
        Giao dịch theo loại giao dịch
      </Text>
      <Row align={'middle'} justify={'center'} style={{ gap: '70px', marginBottom: '24px' }}>
        {isNoData ? (
          <Image
            src={'/images/img-chart-nodata.png'}
            width={140}
            height={140}
            alt=''
            style={{ width: '200px', height: '200px' }}
          />
        ) : (
          <div style={{ width: '200px', height: '200px' }}>
            <Doughnut
              width={200}
              height={200}
              data={transactionTypeData}
              options={doughnutOptions}
            />
          </div>
        )}

        <Space size={20} direction='vertical'>
          {DATA_NOTE?.map((item) => {
            const percentage = calculatePercentage(
              item?.value,
              totalValue.reduce((acc: number, data: number) => acc + data, 0),
            );
            return (
              <Row key={item?.id} align={'middle'} style={{ gap: '10px' }}>
                <div
                  className={styles.tagNote}
                  style={{
                    background: item?.bgColor,
                  }}
                />
                <Text type='font-14-400'>
                  {`${item?.text}: `}
                  <Text element='span' className={styles.textNote} type='font-14-400'>{`${
                    item?.value
                  } (${percentage.toFixed(1)})%`}</Text>
                </Text>
              </Row>
            );
          })}
        </Space>
      </Row>
    </div>
  );
};
export default CardTransactionType;
