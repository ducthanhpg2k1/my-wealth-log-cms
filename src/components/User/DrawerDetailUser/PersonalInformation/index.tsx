import { Col, Row } from 'antd';
import dayjs from 'dayjs';

import Text from '@components/UI/Text';

const PersonalInformation = ({ dataDetail }: any) => {
  return (
    <>
      <Text type='font-14-700' color='text-green'>
        THÔNG TIN CÁ NHÂN
      </Text>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Tên người dùng
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.displayName || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Số điện thoại
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.phoneNumber || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Email
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.email || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Ngày sinh
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.dob ? dayjs(dataDetail?.dob).format('DD/MM/YYYY') : '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Giới tính
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.gender || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Số CCCD
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.identification || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Số bằng lái xe
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.license || '-'}
          </Text>
        </Col>
      </Row>
      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Nghề nghiệp
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.jobId?.name || '-'}
          </Text>
        </Col>
      </Row>

      <Text type='font-14-700' color='text-green'>
        THÔNG TIN CÁ NHÂN
      </Text>

      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Món ăn yêu thích
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.foodPreferences || '-'}
          </Text>
        </Col>
      </Row>

      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Thể thao
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.sportInterests || '-'}
          </Text>
        </Col>
      </Row>

      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Giải trí
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.entertainmentInterests || '-'}
          </Text>
        </Col>
      </Row>

      <Row align={'stretch'}>
        <Col span={8}>
          <Text type='font-14-400' color='neutral-700'>
            Màu sắc yêu thích
          </Text>
        </Col>
        <Col span={16}>
          <Text type='font-14-400' color='text-primary'>
            {dataDetail?.favouriteColor || '-'}
          </Text>
        </Col>
      </Row>
    </>
  );
};
export default PersonalInformation;
