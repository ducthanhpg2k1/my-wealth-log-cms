import { message } from 'antd';

export const ROUTE_PATH = {
  SIGN_IN: '/auth/sign-in',
  Home: '/',
  USER: '/user',
  NOTI_MANAGEMENT: '/noti-management',
  STATISTICS: '/statistics',

  UPLOAD_FILE: '/api/v1/configs/files/upload',
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

export const EXT_IMAGE = ['jpg', 'jpeg', 'png'];
export const isImage = (file: any) => {
  if (!file) {
    return false;
  }

  const name = file?.name?.split('.');

  return file.type?.includes('image') && EXT_IMAGE.includes(name[name?.length - 1]?.toLowerCase());
};

export enum TYPE_DATE {
  DAILY = 'daily',
  MONTHLY = 'monthly',
  WEEKLY = 'weekly',
}

export enum TYPE_DATE_SEND {
  MONDAY = 1,
  TUESDAY = 2,
  WEBNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 0,
}
