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
import { Doughnut } from 'react-chartjs-2';

import Text from '@components/UI/Text';

import styles from './index.module.scss';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DATA_NOTE = [
  {
    id: 1,
    text: 'Tạo thủ công',
    bgColor: '#23B9E4',
  },
  {
    id: 2,
    text: 'Hệ thống tự sinh',
    bgColor: '#17B899',
  },
  {
    id: 3,
    text: 'Quét QR',
    bgColor: '#FDD76D',
  },
];

const CardTransactionComplicated = ({ data }: any) => {
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const transactionTypeData = {
    labels: ['Hệ thống tự sinh', 'Tạo thủ công', 'Quét QR'],
    datasets: [
      {
        data: [data?.automatic_generation, data?.hand_crafted, data?.qr_scan],
        backgroundColor: ['#17B899', '#23B9E4', '#FDD76D'],
      },
    ],
  };

  return (
    <div className={styles.card}>
      <Text type='font-18-600' color='text-primary'>
        Giao dịch theo hình thức tạo
      </Text>
      <Row align={'middle'} justify={'center'} style={{ gap: '70px', marginBottom: '24px' }}>
        <div style={{ width: '140px', height: '140px' }}>
          <Doughnut width={140} height={140} data={transactionTypeData} options={doughnutOptions} />
        </div>
        <Space size={20} direction='vertical'>
          {DATA_NOTE?.map((item) => {
            return (
              <Row key={item?.id} align={'middle'} style={{ gap: '10px' }}>
                <div
                  className={styles.tagNote}
                  style={{
                    background: item?.bgColor,
                  }}
                />
                <Text type='font-14-400'>{item?.text}</Text>
              </Row>
            );
          })}
        </Space>
      </Row>
    </div>
  );
};
export default CardTransactionComplicated;
