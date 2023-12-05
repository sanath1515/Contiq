import React from 'react';
import LandingTemplate from '@components/templates/LandingTemplate';
import ResetPasswordSuccess from '@components/molecules/ResetPasswordSuccess';

export const PasswordSuccessPage = () => {
  return <LandingTemplate rightBody={<ResetPasswordSuccess />} />;
};
