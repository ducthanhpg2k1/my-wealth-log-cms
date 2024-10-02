import { message } from 'antd';

export const ROUTE_PATH = {
  Home: '/',
  USER: '/user',
  NOTI_MANAGEMENT: '/noti-management',
  STATISTICS: '/statistics',
};

export const REG_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export enum STATUS_USER {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

type MessageType = 'success' | 'info' | 'warning' | 'error';

export const openNotification = (textMessage: string, type: MessageType) => {
  if (type === 'success') {
    message.success(textMessage);
  } else {
    message.error(textMessage);
  }
};
