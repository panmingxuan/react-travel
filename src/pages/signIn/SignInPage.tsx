import React from 'react';
import { UserLayout } from '../../layouts/userLayout';
import { SigInForm } from './SigInForm';

export const SignInPage: React.FC = (props) => {
  return (
    <UserLayout>
      <SigInForm />
    </UserLayout>
  );
};
