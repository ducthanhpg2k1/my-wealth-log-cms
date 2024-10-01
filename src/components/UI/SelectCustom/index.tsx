/* eslint-disable multiline-ternary */
import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib';

interface ISelectProps extends SelectProps {
  maxTagCount?: number;
}
const SelectCustom = (props: ISelectProps) => {
  const { maxTagCount, ...rest } = props;
  return (
    <Select
      filterOption={false}
      suffixIcon={
        <CaretDownOutlined
          size={24}
          style={{
            color: '#828282',
          }}
        />
      }
      maxTagCount={maxTagCount}
      {...rest}
    />
  );
};
export default SelectCustom;
