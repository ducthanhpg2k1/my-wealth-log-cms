/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-undef */
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

const CardTransactionComplicated = ({ data }: any) => {
  const isNoData = useMemo(() => {
    return isAllZero(data);
  }, [data]);

  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? (value / total) * 100 : 0;
  };

  const DATA_NOTE = [
    {
      id: 1,
      text: 'Tạo thủ công',
      bgColor: '#23B9E4',
      value: data?.hand_crafted,
    },
    {
      id: 2,
      text: 'Hệ thống tự sinh',
      bgColor: '#17B899',
      value: data?.automatic_generation,
    },
    {
      id: 3,
      text: 'Quét OCR',
      bgColor: '#FDD76D',
      value: data?.ocr_scan,
    },
    {
      id: 4,
      text: 'Gemini',
      bgColor: '#EA6A34',
      value: data?.gemini,
    },
  ];

  const totalValue = [data?.hand_crafted, data?.automatic_generation, data?.ocr_scan, data?.gemini];

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
    labels: ['Hệ thống tự sinh', 'Tạo thủ công', 'Quét OCR', 'Gemini '],
    datasets: [
      {
        data: [data?.automatic_generation, data?.hand_crafted, data?.ocr_scan, data?.gemini],
        backgroundColor: ['#17B899', '#23B9E4', '#FDD76D', '#EA6A34'],
      },
    ],
  };

  return (
    <div className={styles.card}>
      <Text type='font-18-600' color='text-primary'>
        Giao dịch theo hình thức tạo
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
                  } (${percentage.toFixed(1)}%)`}</Text>
                </Text>
              </Row>
            );
          })}
        </Space>
      </Row>
    </div>
  );
};
export default CardTransactionComplicated;
