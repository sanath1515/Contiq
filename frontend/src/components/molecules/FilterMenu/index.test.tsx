import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterMenu from '.';
import '@testing-library/jest-dom';

describe('FilterMenu component', () => {
  const mockOptions = [
    { label: 'Option 1', onClick: jest.fn() },
    { label: 'Option 2', onClick: jest.fn() }
  ];

  const mockAnchorEl = document.createElement('button');

  it('should render the label correctly', () => {
    const { getByText } = render(
      <FilterMenu
        isOpen={true}
        filterLabel="Filter Label"
        options={mockOptions}
        anchorEl={mockAnchorEl}
      />
    );
    const labelElement = getByText('Filter Label');
    expect(labelElement).toBeInTheDocument();
  });

  it('should render the options correctly', () => {
    const { getByText } = render(
      <FilterMenu
        isOpen={true}
        filterLabel="Filter Label"
        options={mockOptions}
        anchorEl={mockAnchorEl}
      />
    );
    const option1 = getByText('Option 1');
    const option2 = getByText('Option 2');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('should call correct onClick function when an option is clicked', () => {
    const { getByText } = render(
      <FilterMenu
        isOpen={true}
        filterLabel="Filter Label"
        options={mockOptions}
        anchorEl={mockAnchorEl}
      />
    );
    const option1 = getByText('Option 1');
    fireEvent.click(option1);
    expect(mockOptions[0].onClick).toHaveBeenCalled();
  });
});
