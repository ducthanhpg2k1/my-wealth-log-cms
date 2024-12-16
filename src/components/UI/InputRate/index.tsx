import { Rate } from 'antd';

import styles from './index.module.scss';


const InputRate = ({ onChange, value }: any) => {
  return (
    <div className={styles.container}>
      <Rate onChange={onChange} value={value} />
    </div>
  )
}
export default InputRate