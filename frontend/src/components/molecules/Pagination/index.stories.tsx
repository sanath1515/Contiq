import Pagination from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'molecules/Pagination',
  component: Pagination
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPagination: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    zoomLevel: 85,
    decreaseZoom: () => Object,
    increaseZoom: () => Object
  }
};
