/* eslint-disable require-await */
/* eslint-disable unicorn/consistent-function-scoping */
import { useAtom } from 'jotai';

import { API_PATH } from '@api/constant';
import { PREFIX_API, privateRequest } from '@api/request';

import { profileAtom } from './profile';

export const useProfileInitial = () => {
  const [profile, setProfile] = useAtom(profileAtom);

  const run = () => {
    const init = async () => {
      const res = await privateRequest(fetch, `${PREFIX_API}${API_PATH.GET_USER}`).then((res) =>
        res.json(),
      );
      setProfile({
        ...res?.data?.user,
      });
    };
    init();
  };

  return {
    profile,
    requestGetProfile: run,
  };
};
