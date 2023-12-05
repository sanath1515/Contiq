import '@testing-library/jest-dom';
afterAll(() => {
  global.gc && global.gc();
});
