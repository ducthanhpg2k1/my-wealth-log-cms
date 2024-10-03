/* eslint-disable require-await */
/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
/* eslint-disable unicorn/no-null */
import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';

export interface IFilter {
  content: string | null;
  repeat: boolean;
}

interface IFilterReport {
  createdAtFrom: string;
  createdAtTo: string;
}
const serviceGetReportNewUser = async (filter: IFilterReport) => {
  const params = {
    createdAtFrom: filter?.createdAtFrom,
    createdAtTo: filter?.createdAtTo,
  };

  return await privateRequest(request.get, API_PATH.REPORT_NEW_USER, { params });
};

export const useGetReportNewUser = () => {
  const { data, loading, run, refreshAsync } = useRequest(async (filter: IFilterReport) => {
    return await serviceGetReportNewUser(filter);
  });

  const onChange = (filter: IFilterReport) => {
    run(filter);
  };

  return {
    onChange,
    dataNewUser: data,
    run,
    loading,
    refreshAsync,
  };
};

const serviceGetReportNewAssets = async (filter: IFilterReport) => {
  const params = {
    createdAtFrom: filter?.createdAtFrom,
    createdAtTo: filter?.createdAtTo,
  };
  return await privateRequest(request.get, API_PATH.REPORT_NEW_ASSETS, { params });
};

export const useGetReportNewAssets = () => {
  const { data, loading, run, refreshAsync } = useRequest(async (filter: IFilterReport) => {
    return await serviceGetReportNewAssets(filter);
  });

  const onChange = (filter: IFilterReport) => {
    run(filter);
  };

  return {
    onChange,
    dataNewAssets: data,
    run,
    loading,
    refreshAsync,
  };
};

const serviceGetReportNotifications = async (filter: IFilterReport) => {
  const params = {
    createdAtFrom: filter?.createdAtFrom,
    createdAtTo: filter?.createdAtTo,
  };
  return await privateRequest(request.get, API_PATH.REPORT_NOTIFICATIONS, { params });
};

export const useGetReportNotifications = () => {
  const { data, loading, run, refreshAsync } = useRequest(async (filter: IFilterReport) => {
    return await serviceGetReportNotifications(filter);
  });

  const onChange = (filter: IFilterReport) => {
    run(filter);
  };

  return {
    onChange,
    dataNotifications: data,
    run,
    loading,
    refreshAsync,
  };
};

const serviceGetReportTransactions = async (filter: IFilterReport) => {
  const params = {
    createdAtFrom: filter?.createdAtFrom,
    createdAtTo: filter?.createdAtTo,
  };
  return await privateRequest(request.get, API_PATH.REPORT_TRANSACTIONS, { params });
};

export const useGetReportTransactions = () => {
  const { data, loading, run, refreshAsync } = useRequest(async (filter: IFilterReport) => {
    return await serviceGetReportTransactions(filter);
  });

  const onChange = (filter: IFilterReport) => {
    run(filter);
  };

  return {
    onChange,
    dataTransactions: data,
    run,
    loading,
    refreshAsync,
  };
};
