import { ReactElement } from 'react';

import SignIn from '@components/Auth/SignIn';
import AuthLayout from '@layout/AuthLayout';

const SignInPage = () => {
  return <SignIn />;
};

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout type='main'>
      <>{page}</>
    </AuthLayout>
  );
};

export default SignInPage;
