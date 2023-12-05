import Header from '@components/organisms/Header';
import { Navbar } from '@components/organisms/Navbar';
import { HomeTemplate } from '@components/templates/HomeTemplate';
import React, { useState } from 'react';
import { useUserContext } from '@src/utils/ThemeContext';
import PdfViewer from '@components/organisms/PdfViewer';
import { useLocation } from 'react-router';

const ViewPdfPage = () => {
  const [dummyState] = useState(false);
  const { currUser } = useUserContext();
  const location = useLocation();
  const pdfUrl = location.state.pdfUrl;
  const user = {
    userId: currUser.id,
    userName: currUser.name,
    avatarUrl: 'assets/icons/Avatar.svg'
  };
  return (
    <>
      <HomeTemplate
        sidebar={<Navbar activeTab={'Files'} />}
        header={<Header user={user} handleExtraProp={dummyState}></Header>}
        content={<PdfViewer file={pdfUrl} page={1} paragraph=""></PdfViewer>}
      ></HomeTemplate>
    </>
  );
};

export default ViewPdfPage;
