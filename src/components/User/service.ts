/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';

export interface IFilter {
  isActived: boolean;
  createdAtFrom: string | null;
  createdAtTo: string | null;
}

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

const serviceGetUser = async (page?: number, filter?: IFilter) => {
  const params = {
    page: page || 1,
    page_size: 10,
    isActived: filter?.isActived,
    createdAtFrom: filter?.createdAtFrom,
    createdAtTo: filter?.createdAtTo,
  };
  return await privateRequest(request.get, API_PATH.USER, { params });
};

export const useGetUser = () => {
  const { data, loading, run, refreshAsync } = useRequest(
    async (page?: number, filter?: IFilter) => {
      return await serviceGetUser(page, filter);
    },
  );
  const onChange = (page?: number, filter?: IFilter) => {
    run(page, filter);
  };
  return {
    dataUsers: data,
    run,
    loading,
    onChange,
    refreshAsync,
  };
};

export const serviceExportFileUser = async () => {
  return privateRequest(request.post, API_PATH.EXPORT_FILE_USER, {
    responseType: 'blob',
  });
};

export const useExportFileUser = (options?: IOptionsRequest) => {
  return useRequest(serviceExportFileUser, {
    manual: true,
    ...options,
  });
};

export const useDeleteUsers = (options?: IOptionsRequest) => {
  return useRequest(
    (id: any) => {
      return privateRequest(request.delete, API_PATH.EDIT_NOTIFICATIONS(id), {});
    },
    {
      manual: true,
      ...options,
    },
  );
};
