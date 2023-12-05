import React, { createContext, useState } from 'react';
import './App.css';
import { SigninPage } from './pages/SigninPage';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { CreateNewPassword } from './pages/CreatePasswordPage';
import { PasswordSuccessPage } from './pages/PasswordSuccessPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { searchProps } from './utils/constants';
import HomePage from './pages/HomePage';
import FilesPage from './pages/FilesPage';
import ViewPdfPage from './pages/ViewPdf';

export const FilesUploadedContext = createContext({
  filesUploaded: 0,
  count: 0,
  increment: () => {},
  setFiles: (num: number) => {}
});

function App() {
  const [filesUploaded, setFilesUploaded] = useState(0);
  const increment = () => {
    setFilesUploaded(filesUploaded + 1);
  };
  let count = 0;
  return (
    <FilesUploadedContext.Provider
      value={{
        filesUploaded: filesUploaded,
        increment: increment,
        count: count,
        setFiles: (num: number) => {
          setFilesUploaded(num);
        }
      }}
    >
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/createPassword" element={<CreateNewPassword />} />
        <Route path="/passwordSuccess" element={<PasswordSuccessPage />} />
        <Route path="/viewPdf" element={<ViewPdfPage />} />
        <Route path="/searchResults" element={<SearchResultsPage />} />
      </Routes>
    </FilesUploadedContext.Provider>
  );
}
export default App;
