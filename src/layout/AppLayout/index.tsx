import { useEffect } from 'react';

import { Toaster } from 'sonner';

import { getAccessToken } from '@store/auth';
import { useProfileInitial } from '@store/profile/useProfileInitial';

const AppLayout = ({ children }: any) => {
  const { requestGetProfile } = useProfileInitial();
  const token = getAccessToken();

  useEffect(() => {
    if (token) {
      requestGetProfile();
    }
  }, []);
  return (
    <>
      <main>{children}</main>

      <Toaster position='top-center' />
    </>
  );
};

export default AppLayout;
