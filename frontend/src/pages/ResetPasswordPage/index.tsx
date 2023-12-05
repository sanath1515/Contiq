import React from 'react';
import LandingTemplate from '@components/templates/LandingTemplate';
import ResetPassword from '@components/organisms/ResetPassword';

export const ResetPasswordPage = () => {
  return (
    <LandingTemplate rightBody={<ResetPassword emailId="samuel@gmail.com" />} />
  );
};
