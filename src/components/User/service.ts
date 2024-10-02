import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';

export interface IFilter {
  isActived: boolean;
  createdAtFrom: string | null;
  createdAtTo: string | null;
}

const serviceGetUser = async (filter?: IFilter) => {
  const params = {
    isActived: filter?.isActived,
    createdAtFrom: filter?.createdAtFrom,
    createdAtTo: filter?.createdAtTo,
  };
  return await privateRequest(request.get, API_PATH.USER, { params });
};

export const useGetUser = () => {
  const { data, loading, run, refreshAsync } = useRequest(async (filter?: IFilter) => {
    return await serviceGetUser(filter);
  });
  const onChange = (filter?: IFilter) => {
    run(filter);
  };
  return {
    dataUsers: data,
    run,
    loading,
    onChange,
    refreshAsync,
  };
};
