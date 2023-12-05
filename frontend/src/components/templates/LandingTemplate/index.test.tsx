import { render } from '@testing-library/react';
import React from 'react';
import { SignUp } from '../../organisms/Signup';
import LandingTemplate from '.';
import { BrowserRouter } from 'react-router-dom';

test('Sign Up rendered or not', () => {
  const page = render(
    <BrowserRouter>
      <LandingTemplate rightBody={<SignUp />} />
    </BrowserRouter>
  );
  expect(page).toBeDefined();
});
