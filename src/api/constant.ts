export const API_PATH = {
  // Auth
  AUTH_LOGIN: '/api/v1/auth/admin/login',
  USER: '/api/v1/users',
  NOTIFICATIONS: '/api/v1/notifications',
  EDIT_NOTIFICATIONS: (id: string) => `/api/v1/notifications/${id}`,
  DELETE_NOTIFICATIONS: '/api/v1/notifications/delele-multiple',

  FREQUENCIES: '/api/v1/configs/rental-frequencies',

  EXPORT_FILE_USER: '/api/v1/users/export',

  EXPORT_FILE_NOTIFICATIONS: '/api/v1/notifications/export',

  REPORT_NEW_USER: '/api/v1/users/report',

  REPORT_NEW_ASSETS: '/api/v1/assets/report-new-assets',

  REPORT_NOTIFICATIONS: '/api/v1/notifications/report',

  REPORT_TRANSACTIONS: '/api/v1/transactions/all-report',

  REPORT_TRANSACTIONS_BY_TYPE: '/api/v1/transactions/report-by-type',

  REPORT_TRANSACTIONS_BY_CREATE_TYPE: '/api/v1/transactions/report-by-create-type',

  REPORT_LOAN: '/api/v1/loans/report-all',

  GET_USER: '/api/v1/users/me',
};
