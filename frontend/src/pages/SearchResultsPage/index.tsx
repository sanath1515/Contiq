import { HomeTemplate } from '@components/templates/HomeTemplate';
import { Navbar } from '@components/organisms/Navbar';
import Header from '@components/organisms/Header';
import PdfViewer, { PdfViewerProps } from '@components/organisms/PdfViewer';
import SearchCard, { SearchCardProps } from '@components/organisms/SearchCard';
import { Typography } from '@components/atoms/Typography';
import LeftArrowIcon from '../../../public/assets/icons/chevron.svg';
import Icon from '@components/atoms/Icon';
import { Stack } from '@mui/material';
import { SEARCH_CARD_CONSTANTS } from '@src/utils/constants';
import { useLocation, useNavigate } from 'react-router';
import { useUserContext } from '@src/utils/ThemeContext';
import SimpleSnackbar from '@components/molecules/Popover';
import { useEffect, useRef, useState } from 'react';
export const SearchResultsPage = () => {
  const [isPopoverOpen, setIsPopOverOpen] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const { currUser } = useUserContext();
  const location = useLocation();
  const paragraphs = location.state.paragraphs;
  const pages = location.state.pages;
  const pdfUrl = location.state.pdfUrl;
  const keyword = location.state.keyword;
  const fileName = location.state.fileName;

  console.log('location', location);
  console.log('pages', pages);
  console.log('paragraphs', paragraphs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(
    paragraphs[currentIndex]
  );
  const [currentPage, setCurrentPage] = useState(pages[currentIndex]);

  const user = {
    userId: currUser.id,
    userName: currUser.name,
    avatarUrl: 'assets/icons/Avatar.svg'
  };
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/files');
  };
  const handlePopOver = () => {
    setIsPopOverOpen(true);
  };

  const handleUpClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDownClick = () => {
    if (currentIndex < paragraphs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(pages[currentIndex]);
    setCurrentParagraph(paragraphs[currentIndex]);
  }, [currentIndex]);

  return (
    <HomeTemplate
      sidebar={<Navbar activeTab={'Home'} />}
      header={<Header user={user} handleExtraProp={false}></Header>}
      content={
        <>
          <Stack
            direction={'row'}
            alignItems="center"
            gap="0.25vw"
            className="custom-margin"
          >
            <Icon src={LeftArrowIcon} alt={'image'} onClick={handleOnClick} />
            <Typography variant="h2">{fileName}</Typography>
          </Stack>
          <Stack className="custom-margin">
            <PdfViewer file={pdfUrl} page={currentPage} paragraph={keyword} />
          </Stack>
          <SearchCard
            currentResult={currentIndex + 1}
            totalResults={paragraphs.length}
            currentSlide={currentPage}
            searchQuery={keyword}
            fileTitle={fileName}
            totalSlides={10}
            handleDownClick={handleDownClick}
            handleUpClick={handleUpClick}
            togglePopOver={handlePopOver}
            paragraph={currentParagraph}
            filepath={pdfUrl}
          />
          <SimpleSnackbar
            innerRef={toolbarRef}
            isOpen={isPopoverOpen}
            buttonTestId="close"
            Text={SEARCH_CARD_CONSTANTS.copyText}
            handlingClose={() => setIsPopOverOpen(false)}
          ></SimpleSnackbar>
        </>
      }
    ></HomeTemplate>
  );
};
