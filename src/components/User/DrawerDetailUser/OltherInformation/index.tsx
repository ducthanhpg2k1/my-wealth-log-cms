/* eslint-disable indent */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/switch-case-braces */
import { Col, Row } from 'antd';

import Text from '@components/UI/Text';
import { MARITAL_STATUS } from '@utils/common';

const OltherInformation = ({ dataDetail }: any) => {
  const renderTextMarital = (marital: string) => {
    let text: string = '';
    switch (marital) {
      case MARITAL_STATUS.SINGLE:
        text = 'Độc thân';
        break;
      case MARITAL_STATUS.DIVORCE:
        text = 'Đã kết hôn';
        break;
      case MARITAL_STATUS.MARRIAGE:
        text = 'Ly hôn';
        break;
    }

    return text;
  };
  return (
    <>
      <Text type='font-14-700' color='text-green'>
        THÔNG TIN KHÁC
      </Text>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Tình trạng hôn nhân
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.maritalStatus ? renderTextMarital(dataDetail?.maritalStatus) : '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Con cái
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.childNumber || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Nhóm máu
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.bloodGroupId?.name || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Con giáp
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.zodiacId?.name || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Cung hoàng đạo
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.zodiacSignId?.name || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Chiều cao
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.height ? `${dataDetail?.height} cm` : '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Cân nặng
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.weight ? `${dataDetail?.weight} kg` : '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Mệnh
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.fateId?.name || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Tử Vi
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.horoscope || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Ngũ hành
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.existence || '-'}
          </Text>
        </Col>
      </Row>
    </>
  );
};
export default OltherInformation;
