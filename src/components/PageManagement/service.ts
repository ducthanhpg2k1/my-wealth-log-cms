/* eslint-disable require-await */
/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
/* eslint-disable unicorn/no-null */
import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';

export interface IFilter {
  content: string | null;
  repeat: boolean | string;
}
interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}
const serviceSetupLdpage = (body: any) => {
  return privateRequest(request.post, API_PATH.SET_UP_LDPAGE, {
    data: body,
  });
};

export const useSetupLdpage = (options: any) => {
  return useRequest(serviceSetupLdpage, {
    manual: true,
    ...options,
  });
};


const serviceEditSetupLdpage = (body: any, id: any) => {
  return privateRequest(request.put, API_PATH.EDIT_SET_UP_LDPAGE(id), {
    data: body,
  });
};

export const useEditSetupLdpage = (options: any) => {
  return useRequest(serviceEditSetupLdpage, {
    manual: true,
    ...options,
  });
};


const serviceGetConfigLdPage = async () => {
  return await privateRequest(request.get, API_PATH.SET_UP_LDPAGE);
};



export const useGetConfigLdPage = (options?: IOptionsRequest) => {
  const { data, loading, run, refreshAsync } = useRequest(async () => {
    return await serviceGetConfigLdPage();
  }, {
    ...options
  });

  return {
    dataConfigLdPage: data,
    run,
    loading,
    refreshAsync,
  };
};


