import React from 'react';
import { Signin } from '@components/organisms/Signin';
import LandingTemplate from '@components/templates/LandingTemplate';

export const SigninPage = () => {
  return <LandingTemplate rightBody={<Signin />} />;
};
