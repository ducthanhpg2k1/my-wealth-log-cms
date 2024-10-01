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
