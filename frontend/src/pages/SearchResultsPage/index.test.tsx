import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchResultsPage } from '.'; // Import your component
import * as services from '../../services';

// Mock the necessary context and dependencies
jest.mock('@src/utils/ThemeContext', () => ({
  useUserContext: () => ({
    currUser: { id: 1, name: 'TestUser' }
  })
}));
jest.mock('react-router', () => ({
  useLocation: () => ({
    state: {
      paragraphs: ['Paragraph 1', 'Paragraph 2'],
      pages: [1, 2],
      pdfUrl: 'sample.pdf',
      keyword: 'testKeyword',
      fileName: 'Sample File'
    }
  }),
  useNavigate: () => jest.fn()
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn()
  }
});

const mockResponseNotificationData = [
  {
    id: 1,
    user_id: 1,
    actor_id: 2,
    actor_name: 'Jane',
    action: 'uploaded',
    file_id: 0,
    file_name: 'Document1.pdf',
    is_read: 0,
    created_at: '2023-08-03T03:33:00.000Z'
  },
  {
    id: 2,
    user_id: 1,
    actor_id: 1,
    actor_name: 'John',
    action: 'requested access',
    file_id: 2,
    file_name: 'Document2.pdf',
    is_read: 0,
    created_at: '2023-08-04T04:44:00.000Z'
  }
];

const mockResponse = {
  data: {
    name: 'John Doe'
  }
};
jest
  .spyOn(services, 'fetchNotificationData')
  .mockResolvedValue(mockResponseNotificationData);
jest.spyOn(services, 'fetchUserName').mockResolvedValue(mockResponse);

describe('SearchResultsPage', () => {
  it('renders SearchResultsPage correctly', () => {
    render(<SearchResultsPage />);
  });

  it('handles navigation correctly', () => {
    const navigateMock = jest.fn();
    jest.mock('react-router', () => ({
      ...jest.requireActual('react-router'),
      useNavigate: () => navigateMock
    }));

    render(<SearchResultsPage />);

    // Simulate a click event on the left arrow icon
    fireEvent.click(screen.getByText('Files'));
  });

  it('handles up and down click correctly', () => {
    render(<SearchResultsPage />);

    // Simulate clicking the up button
    fireEvent.click(screen.getByAltText('up'));

    // Simulate clicking the down button
    fireEvent.click(screen.getByAltText('down'));

    fireEvent.click(screen.getByAltText('image'));
    fireEvent.click(screen.getByAltText('copy'));
  });
});
