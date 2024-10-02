/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { request } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

export const useLoginUserName = (options?: IOptionsRequest) => {
  return useRequest(
    async ({ username, password }: { username: string; password: string }) => {
      return request.post(API_PATH.AUTH_LOGIN, {
        data: {
          username,
          password,
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
