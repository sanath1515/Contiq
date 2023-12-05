import React from 'react';
import LandingTemplate from '@components/templates/LandingTemplate';
import CreatePassword from '@components/organisms/CreatePassword';

export const CreateNewPassword = () => {
  return <LandingTemplate rightBody={<CreatePassword />} />;
};
