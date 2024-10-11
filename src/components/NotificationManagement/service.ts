/* eslint-disable require-await */
/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
/* eslint-disable unicorn/no-null */
import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';
import { ROUTE_PATH } from '@utils/common';

export interface IFilter {
  content: string | null;
  repeat: boolean;
}
interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodyNotifications {
  name: string;
  userId?: string;
  content: string;
  frequencyId?: string;
  sendAt?: any;
  hourSendAt?: string | null;
  daySendAt?: string | null;
  repeat: boolean;
}

const serviceGetNotifications = async (page?: number, filter?: IFilter) => {
  const params = {
    page: page || 1,
    page_size: 10,
    content: filter?.content,
    repeat: filter?.repeat ? filter?.repeat : null,
  };
  return await privateRequest(request.get, API_PATH.NOTIFICATIONS, { params });
};

export const useGetNotifications = () => {
  const { data, loading, run, refreshAsync } = useRequest(
    async (page?: number, filter?: IFilter) => {
      return await serviceGetNotifications(page, filter);
    },
  );
  const onChange = (page?: number, filter?: IFilter) => {
    run(page, filter);
  };
  return {
    dataNotifications: data,
    run,
    loading,
    onChange,
    refreshAsync,
  };
};

const serviceCreateNotifications = (body: IBodyNotifications) => {
  return privateRequest(request.post, API_PATH.NOTIFICATIONS, {
    data: body,
  });
};

export const useCreateNotifications = (options: IOptionsRequest) => {
  return useRequest(serviceCreateNotifications, {
    manual: true,
    ...options,
  });
};

const serviceEditNotifications = (body: IBodyNotifications, id: string) => {
  return privateRequest(request.put, API_PATH.EDIT_NOTIFICATIONS(id), {
    data: body,
  });
};

export const useEditNotifications = (options: IOptionsRequest) => {
  return useRequest(serviceEditNotifications, {
    manual: true,
    ...options,
  });
};

const serviceGetAllFrequencies = async () => {
  return await privateRequest(request.get, API_PATH.FREQUENCIES);
};

export const useGetAllFrequencies = () => {
  const { data, loading, run, refreshAsync } = useRequest(async () => {
    return await serviceGetAllFrequencies();
  });

  return {
    dataFrequencies: data,
    run,
    loading,
    refreshAsync,
  };
};

const serviceGetDetailNotification = async (id: string) => {
  return await privateRequest(request.get, API_PATH.EDIT_NOTIFICATIONS(id));
};

export const useGetDetailNotification = () => {
  const { data, loading, run, refreshAsync } = useRequest(
    async (id) => {
      return await serviceGetDetailNotification(id);
    },
    {
      manual: true,
    },
  );

  return {
    dataDetail: data,
    run,
    loading,
    refreshAsync,
  };
};

export const useDeleteNotification = (options?: IOptionsRequest) => {
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

const serviceDeleteNotifications = (body: { ids: string[] }) => {
  return privateRequest(request.post, API_PATH.DELETE_NOTIFICATIONS, {
    data: body,
  });
};

export const useDeleteNotifications = (options: IOptionsRequest) => {
  return useRequest(serviceDeleteNotifications, {
    manual: true,
    ...options,
  });
};

export const serviceExportFileNotification = async () => {
  return privateRequest(request.post, API_PATH.EXPORT_FILE_NOTIFICATIONS, {
    responseType: 'blob',
  });
};

export const useExportFileNotification = (options?: IOptionsRequest) => {
  return useRequest(serviceExportFileNotification, {
    manual: true,
    ...options,
  });
};

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
