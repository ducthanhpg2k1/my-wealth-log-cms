import { Col, Layout, Row } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';

import styles from './index.module.scss';

const { Content } = Layout;

const AuthLayout = ({ children }: any) => {
  return (
    <Layout className='layout'>
      <Content>
        <Row className={styles.mainContainer}>
          <Col span={12} className={classNames(styles.leftContainer, {})}>
            <div className={styles.logoContainer}>
              <Image
                className={styles.image}
                width={62}
                height={56}
                src='/images/logo.png'
                alt=''
              />
            </div>
            {/* <div className={styles.imageBgLogin}>
              <Image
                className={styles.image}
                width={1138}
                height={1024}
                src='/images/bg-login.png'
                alt=''
              />
            </div> */}

            <div className={styles.imageLab}>
              <Image
                className={styles.image}
                width={1071}
                height={200}
                src='/images/img-lap.png'
                alt=''
              />
            </div>
          </Col>
          <Col span={12} className={styles.rightContainer}>
            {children}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
