export const API_PATH = {
  // Auth
  AUTH_LOGIN: '/api/v1/auth/admin/login',
  USER: '/api/v1/users',
  NOTIFICATIONS: '/api/v1/notifications',
  EDIT_NOTIFICATIONS: (id: string) => `/api/v1/notifications/${id}`,
  FREQUENCIES: '/api/v1/configs/rental-frequencies',
};
