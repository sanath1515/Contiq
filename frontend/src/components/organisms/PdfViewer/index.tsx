import { Document, Page, pdfjs } from 'react-pdf';
import React, { createRef, useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import theme from '@src/theme/theme';
import { StyledScrollableStack, Thumbnails } from './components';
import Pagination from '@components/molecules/Pagination';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export interface PdfViewerProps {
  file: string;
  paragraph: string;
  page: number;
}

let refs = new Array();

const highlightPattern = (text: string, pattern: string) => {
  const regex = new RegExp(pattern, 'gi');
  return text.replace(regex, (match) => `<mark>${match}</mark>`);
};

function getTextItemWithNeighbors(textItems, itemIndex, span = 1) {
  return textItems
    .slice(Math.max(0, itemIndex - span), itemIndex + 1 + span)
    .filter(Boolean)
    .map((item) => item.str)
    .join('');
}

function getIndexRange(string, substring) {
  const indexStart = string.indexOf(substring);
  const indexEnd = indexStart + substring.length;

  return [indexStart, indexEnd];
}

const PdfViewer = (props: PdfViewerProps) => {
  const [textItems, setTextItems] = useState();

  const { file, paragraph, page } = props;
  const [pages, setPages] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [zoomLevel, setZoomLevel] = useState(100);

  const [isLoaded, setIsLoaded] = useState(false);

  const stringToHighlight = paragraph;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setIsLoaded(true);
    setPages(numPages);
    for (let i = 0; i < numPages; i++) {
      refs.push(createRef());
    }
  };

  const onPageLoadSuccess = useCallback(async (page) => {
    const textContent = await page.getTextContent();
    setTextItems(textContent.items);
  }, []);

  const handleThumbnailClick = (index: number) => {
    setCurrentPage(index);
  };

  const customTextRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, paragraph),
    [paragraph]
  );

  useEffect(() => {
    if (currentPage && refs.length > 0) {
      const currentRef = refs[currentPage - 1].current;
      if (currentRef) refs[currentPage - 1].current.scrollIntoView();
    }
  }, [currentPage]);

  useEffect(() => {
    if (isLoaded) {
      setCurrentPage(page);
    }
  }, [isLoaded, page]);

  return (
    <>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <StyledScrollableStack
          direction={'row'}
          gap={theme.spacing(52)}
          overflow={'hidden'}
          position={'fixed'}
        >
          <StyledScrollableStack
            overflow={'scroll'}
            paddingRight={theme.spacing(10)}
          >
            <Thumbnails
              numPages={pages}
              currentPage={currentPage}
              onPageClick={handleThumbnailClick}
            ></Thumbnails>
          </StyledScrollableStack>
          <StyledScrollableStack
            direction={'column'}
            gap={theme.spacing(8)}
            overflow={'scroll'}
            paddingRight={theme.spacing(68)}
          >
            {Array.from(new Array(pages), (el, index) => (
              <Box
                key={`page_${index + 1}`}
                border={`1px solid ${theme.palette.grey[200]}`}
                ref={refs[index]}
              >
                <Page
                  renderTextLayer={true}
                  renderAnnotationLayer={false}
                  pageNumber={index + 1}
                  width={870 * (zoomLevel / 100)}
                  height={1000}
                  customTextRenderer={customTextRenderer}
                  onLoadSuccess={onPageLoadSuccess}
                ></Page>
              </Box>
            ))}
          </StyledScrollableStack>
          <Box position={'fixed'} left={'45vw'} bottom={40} zIndex={12}>
            <Pagination
              currentPage={currentPage}
              totalPages={pages}
              zoomLevel={zoomLevel}
              increaseZoom={() => setZoomLevel(zoomLevel + 5)}
              decreaseZoom={() => setZoomLevel(zoomLevel - 5)}
            />
          </Box>
        </StyledScrollableStack>
      </Document>
    </>
  );
};

export default PdfViewer;
