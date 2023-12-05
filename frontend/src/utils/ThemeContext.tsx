import React, { createContext, useContext, useEffect, useState } from 'react';
import { IPresentationProps } from './constants';
import { useFiles } from '@src/pages/HomePage/hooks';

interface UserDataProps {
  id: number;
  name: string;
  email: string;
}

type ThemeContextType = {
  currUser: UserDataProps;
  handleUpdateCurrUser: (id: number, name: string, email: string) => void;
  files: IPresentationProps[];
  handleUpdateFiles: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  currUser: {
    id: 0,
    name: 'John Ross',
    email: 'john@example.com'
  },
  handleUpdateCurrUser: () => {},
  files: [],
  handleUpdateFiles: () => {}
});

export const useUserContext = () => useContext(ThemeContext);

export const UserContext = ({ children }: any) => {
  const [currUser, setCurrUser] = useState<UserDataProps>(() => {
    const storedUser = localStorage.getItem('userData');
    return storedUser
      ? JSON.parse(storedUser)
      : {
          id: 0,
          name: 'John Ross',
          email: 'john@example.com'
        };
  });
  const handleUpdateCurrUser = (id: number, name: string, email: string) => {
    setCurrUser({
      id: id,
      name: name,
      email: email
    });
  };
  const { files,updateFiles } = useFiles(currUser.id);
  const handleUpdateFiles = () => {
    updateFiles();
  };
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(currUser));
  }, [currUser]);
  return (
    <ThemeContext.Provider
      value={{ currUser, handleUpdateCurrUser, handleUpdateFiles,files }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
