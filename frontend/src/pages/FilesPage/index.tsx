import Header from '@components/organisms/Header';
import { Navbar } from '@components/organisms/Navbar';
import { HomeTemplate } from '@components/templates/HomeTemplate';
import React, { useEffect, useState } from 'react';
import { BodyContent } from './components';
import { useUserContext } from '@src/utils/ThemeContext';

const FilesPage = () => {
  const [dummyState, setDummy] = useState(false);
  const { currUser,handleUpdateFiles } = useUserContext();
  const user = {
    userId: currUser.id,
    userName: currUser.name,
    avatarUrl: 'assets/icons/Avatar.svg'
  }; //To be modified from Global state during integration
  const handleExtraProp = () => {
    setDummy(!dummyState);
  };
  useEffect(()=>{
    handleUpdateFiles();
  },[dummyState])
  return (
    <>
      <HomeTemplate
        sidebar={<Navbar activeTab={'Files'} />}
        header={<Header user={user} handleExtraProp={dummyState}></Header>}
        content={<BodyContent userId={user.userId} handleExtraProp={handleExtraProp} />}
      ></HomeTemplate>
    </>
  );
};

export default FilesPage;
