import { Row } from 'antd';
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
import { Bar } from 'react-chartjs-2';

import Text from '@components/UI/Text';

import styles from './index.module.scss';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const DATA_NOTE = [
  {
    id: 1,
    title: 'Khoản đi vay',
    bgColor: '#17B899',
  },
  {
    id: 2,
    title: 'Khoản cho vay',
    bgColor: '#FDD76D',
  },
];

const CardSituation = ({ data }: any) => {
  const options: any = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#B0B0B0',
          font: {
            size: 14,
          },
        },
      },
      y: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const dataLoan = {
    labels: ['', ''],
    datasets: [
      {
        data: [data?.loan, data?.borrow],
        backgroundColor: ['#17B899', '#FDD76D'],
        barThickness: 40,
      },
    ],
  };

  return (
    <div className={styles.card}>
      <Row align={'middle'} justify={'space-between'}>
        <Text type='font-18-600' color='text-primary'>
          Tình hình khoản vay
        </Text>
        <Row align={'middle'} style={{ gap: '40px' }}>
          {DATA_NOTE?.map((item) => {
            return (
              <Row key={item?.id} align={'middle'} style={{ gap: '10px' }}>
                <div
                  className={styles.tagNote}
                  style={{
                    background: item?.bgColor,
                  }}
                />
                <Text type='font-14-400'>{item?.title}</Text>
              </Row>
            );
          })}
        </Row>
      </Row>
      <div style={{ width: '100%', height: '230px' }}>
        <Bar data={dataLoan} options={options} />
      </div>
    </div>
  );
};
export default CardSituation;
