import { message } from 'antd';

export const ROUTE_PATH = {
  SIGN_IN: '/auth/sign-in',
  Home: '/',
  USER: '/user',
  NOTI_MANAGEMENT: '/noti-management',
  STATISTICS: '/statistics',

  UPLOAD_FILE: '/api/v1/configs/files/upload',

  PAGE_MANAGEMENT: '/page-management'
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

export enum TYPE_REPEAT {
  YES = 'YES',
  NO = 'NO',
}

export const isAllZero = (obj: any) => {
  return obj && Object?.values(obj).every((value) => value === 0);
};

export const DATE_SEND = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '6',
    value: 6,
  },
  {
    label: '7',
    value: 7,
  },
  {
    label: '8',
    value: 8,
  },
  {
    label: '9',
    value: 9,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '11',
    value: 11,
  },
  {
    label: '12',
    value: 12,
  },
  {
    label: '13',
    value: 13,
  },
  {
    label: '14',
    value: 14,
  },
  {
    label: '15',
    value: 15,
  },
  {
    label: '16',
    value: 16,
  },
  {
    label: '17',
    value: 17,
  },
  {
    label: '18',
    value: 18,
  },
  {
    label: '19',
    value: 19,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '21',
    value: 21,
  },
  {
    label: '22',
    value: 22,
  },
  {
    label: '23',
    value: 23,
  },
  {
    label: '24',
    value: 24,
  },
  {
    label: '25',
    value: 25,
  },
  {
    label: '26',
    value: 26,
  },
  {
    label: '27',
    value: 27,
  },
  {
    label: '28',
    value: 28,
  },
  {
    label: '29',
    value: 29,
  },
  {
    label: '30',
    value: 30,
  },
  {
    label: '31',
    value: 31,
  },
];

export const TIME_SEND = [
  {
    label: '00',
    value: 0,
  },
  {
    label: '01',
    value: 1,
  },
  {
    label: '02',
    value: 2,
  },
  {
    label: '03',
    value: 3,
  },
  {
    label: '04',
    value: 4,
  },
  {
    label: '05',
    value: 5,
  },
  {
    label: '06',
    value: 6,
  },
  {
    label: '07',
    value: 7,
  },
  {
    label: '08',
    value: 8,
  },
  {
    label: '09',
    value: 9,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '11',
    value: 11,
  },
  {
    label: '12',
    value: 12,
  },
  {
    label: '13',
    value: 13,
  },
  {
    label: '14',
    value: 14,
  },
  {
    label: '15',
    value: 15,
  },
  {
    label: '16',
    value: 16,
  },
  {
    label: '17',
    value: 17,
  },
  {
    label: '18',
    value: 18,
  },
  {
    label: '19',
    value: 19,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '21',
    value: 21,
  },
  {
    label: '22',
    value: 22,
  },
  {
    label: '23',
    value: 23,
  },
];

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum MARITAL_STATUS {
  SINGLE = 'single',
  MARRIAGE = 'marriage',
  DIVORCE = 'divorce',
}
