import React from 'react';

import classNames from 'classnames';

import { TColor } from 'styles/color/color.variables';

interface TextProps {
  children: React.ReactNode;
  type?:
    | 'font-32-600'
    | 'font-12-400'
    | 'font-24-600'
    | 'font-24-700'
    | 'font-14-400'
    | 'font-18-600'
    | undefined;
  color?: TColor;
  disabled?: boolean;
  state?: null | 'disable';
  className?: string;
  onClick?: () => void;
  element?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span';
}

const Text: React.FC<TextProps> = ({
  type,
  color,
  disabled = false,
  className = '',
  onClick = () => {},
  children,
  element = 'p',
}) => {
  const classes = classNames(type, color, { 'text-disable': disabled }, className);

  return React.createElement(
    element,
    {
      className: classes,
      onClick,
    },
    React.createElement(React.Fragment, undefined, children),
  );
};

export default Text;
