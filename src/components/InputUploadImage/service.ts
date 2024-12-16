/* eslint-disable require-await */
/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
/* eslint-disable unicorn/no-null */
import { useRequest } from 'ahooks';

import { privateRequest, request } from '@api/request';
import { ROUTE_PATH } from '@utils/common';

export interface IFilter {
  content: string | null;
  repeat: boolean | string;
}
interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}


export const serviceUploadImage = async (file: any, type: string) => {
  const formData = new FormData();

  formData.append('file', file);

  return privateRequest(request.post, `${ROUTE_PATH.UPLOAD_FILE}/?type=${type}`, {
    data: formData,
  });
};

export const useUploadImage = (options?: IOptionsRequest) => {
  return useRequest(serviceUploadImage, {
    manual: true,
    ...options,
  });
};
