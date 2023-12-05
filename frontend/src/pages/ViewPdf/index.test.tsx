import React from 'react';
import { render } from '@testing-library/react';
import ViewPdfPage from '.';

jest.mock('@src/utils/ThemeContext', () => ({
  useUserContext: jest.fn(() => ({
    currUser: {
      id: 1,
      name: 'Test User'
    }
  }))
}));

jest.mock('react-router', () => ({
  useLocation: () => ({
    state: {
      pdfUrl: 'sample.pdf'
    }
  }),
  useNavigate: () => jest.fn()
}));

describe('ViewPdfPage Component', () => {
  it('renders without crashing', () => {
    render(<ViewPdfPage />);
  });
});
