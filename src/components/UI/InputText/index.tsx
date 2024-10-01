/* eslint-disable unicorn/no-null */
import React from 'react';

import Input, { InputProps } from 'antd/lib/input/Input';
import Password, { PasswordProps } from 'antd/lib/input/Password';
import classNames from 'classnames';

import styles from './index.module.scss';

interface IInputText extends InputProps {
  className?: string;
  placeholder?: string;
  suffix?: React.ReactNode | string | null;
  prefix?: React.ReactNode | string | null;
  value?: undefined | string;
  defaultValue?: string;
  disabled?: boolean;
  allowClear?: boolean;
  onChange?: undefined | ((event: React.ChangeEvent) => void);
}

type VisibilityToggle = {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
};
interface IPasswordInput extends PasswordProps {
  className?: string;
  placeholder?: string;
  suffix?: React.ReactNode | string | null;
  prefix?: React.ReactNode | string | null;
  value?: undefined | string;
  defaultValue?: string;
  disabled?: boolean;
  allowClear?: boolean;
  onChange?: undefined | ((event: React.ChangeEvent) => void);
  visibilityToggle?: boolean | VisibilityToggle;
  iconRender?: (visible: boolean) => React.ReactNode;
}

const InputText = (props: IInputText) => {
  const {
    className = '',
    placeholder = '',
    suffix = null,
    prefix = null,
    allowClear = false,
    ...rest
  } = props;

  return (
    <Input
      className={classNames({
        [styles.inputText]: !suffix && !prefix,
        [styles.hasIcon]: !!suffix || !!prefix,
        [className]: !!className,
      })}
      placeholder={placeholder}
      suffix={suffix}
      prefix={prefix}
      allowClear={allowClear}
      {...rest}
    />
  );
};

InputText.displayName = 'InputText';

export default InputText;

export const PasswordInput = (props: IPasswordInput) => {
  const {
    className = '',
    placeholder = '',
    suffix = null,
    prefix = null,
    allowClear = false,
    ...rest
  } = props;

  return (
    <Password
      className={classNames({
        [styles.inputText]: !suffix && !prefix,
        [styles.hasIcon]: !!suffix || !!prefix,
        [className]: !!className,
      })}
      placeholder={placeholder}
      suffix={suffix}
      prefix={prefix}
      allowClear={allowClear}
      {...rest}
    />
  );
};
