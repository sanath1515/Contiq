import { OF, PAGE } from './constants';

export const VALIDATE_PASSWORD = (password: string) => {
  const errors = [];

  if (password.length < 6) {
    errors.push('Password must have atleast 6 characters.');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter.');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one digit.');
  }

  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character.');
  }

  return errors;
};
export function formatPageInfo(currentPage: number, totalPages: number) {
  return `${PAGE} ${currentPage} ${OF} ${totalPages}`;
}
export function appendPercentage(value: number) {
  return `${value} %`;
}
