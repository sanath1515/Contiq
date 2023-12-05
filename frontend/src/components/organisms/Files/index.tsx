import { useState } from 'react';
import Dropdown from '../../molecules/Dropdown/index';
import {
  FILES,
  FILE_EXTENSION_MAP,
  fileTabItems,
  IPresentationProps
} from '../../../utils/constants';
import { Box, Grid } from '@mui/material';
import styled from 'styled-components';
import Tabs from '../../molecules/Tabs';
import theme from '../../../theme/theme';
import {
  generateFileTypeOptions,
  generatePublishSettingOptions,
  handleTestClick,
  filterPresentation
} from '../../../utils/utils';
import PresentationCard from '@components/molecules/PresentationCard';
import { Filter } from '@components/atoms/Filter';
import { DatePicker } from '@components/molecules/DatePicker';
const customTabStyle = {
  textTransform: 'none',

  '&.Mui-selected': {
    color: `${theme.palette.primary[500]}`
  },
  color: `${theme.palette.textColor.mediumEmphasis}`
};

export interface FileProps {
  presentationArray: IPresentationProps[];
  handleFileClick: (id: number) => void;
}

const FilterGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4.39vw;
`;
const LeftFilterGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.87vw;
`;
const RightFilterGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  gap: 0.87vw;
`;
const TabsGrid = styled(Grid)`
  display: flex;
  align-items: center;
  width: 100%;
`;
const FilesGrid = styled(Grid)`
  display: flex;
  gap: ${theme.spacing(8)};
  max-height: 60vh;
  width: 100%;
  overflow-y: scroll;
  flex-wrap: wrap;
  align-items: flex-start;
  &::-webkit-scrollbar {
    width: 5px;
    background: none;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.palette.grey[100]};
    border-radius: ${theme.spacing(1)};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.grey[100]};
  }

  &::-webkit-scrollbar-vertical {
    width: ${theme.spacing(1.25)};
    background: none;
  }

  &::-webkit-scrollbar-thumb:vertical {
    background: ${theme.palette.grey[100]};
    border-radius: ${theme.spacing(1)};
  }

  &::-webkit-scrollbar-thumb:vertical:hover {
    background: ${theme.palette.grey[100]};
  }
`;
const ParentGrid = styled(Grid)`
  display: grid;
  grid-template-rows: auto 1fr; /* First row for FilterGrid, second row for TabsGrid and FilesGrid */
  gap: 1.75vw;
  width: 100%;
`;

const Files: React.FC<FileProps> = (props: FileProps) => {
  const [fileTypeOpen, setFileTypeOpen] = useState<boolean>(false);
  const [selectedFileTypeValue, setSelectedFileTypeValue] = useState<string>(
    FILES.FILE_TYPE
  );

  const [publishOpen, setPublishOpen] = useState<boolean>(false);
  const [selectedPublishValue, setSelectedPublishValue] = useState<string>(
    FILES.PUBLISH
  );

  const [selectedStartDateValue, setSelectedStartDateValue] = useState<string>(
    FILES.START_DATE
  );

  const [selectedEndDateValue, setSelectedEndDateValue] = useState<string>(
    FILES.END_DATE
  );
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const handleFileTypeClick = () => {
    setFileTypeOpen(true);
    if (selectedFileTypeValue !== FILES.FILE_TYPE) {
      setSelectedFileTypeValue(FILES.FILE_TYPE);
      setFileTypeOpen(false);
    }
  };
  const handleOptionFileTypeClick = (label: string) => {
    setSelectedFileTypeValue(label);
    setFileTypeOpen(false);
  };

  const fileTypeOptions = generateFileTypeOptions(handleOptionFileTypeClick);

  const handlePublishClick = () => {
    setPublishOpen(true);
    if (selectedPublishValue !== FILES.PUBLISH) {
      setSelectedPublishValue(FILES.PUBLISH);
      setPublishOpen(false);
    }
  };

  const handleOptionPublishClick = (label: string) => {
    setSelectedPublishValue(label);
    setPublishOpen(false);
  };

  const publishSettingOptions = generatePublishSettingOptions(
    handleOptionPublishClick
  );

  const selectedFileExtension = FILE_EXTENSION_MAP[selectedFileTypeValue];
  const filteredPresentationArray = filterPresentation(
    selectedStartDate,
    selectedEndDate,
    selectedFileExtension,
    props.presentationArray
  );

  return (
    <>
      <ParentGrid>
        <FilterGrid>
          <LeftFilterGrid>
            <Dropdown
              label={selectedFileTypeValue}
              startIconSrc={''}
              isOpen={fileTypeOpen}
              handleClick={handleFileTypeClick}
              boxWidth="max-width"
              justifyContent="space-between"
              filterLabel={FILES.FILE_TYPE}
              options={fileTypeOptions}
              filterOpen={fileTypeOpen}
            ></Dropdown>
            <DatePicker
              setDatelabel={setSelectedStartDateValue}
              date={selectedStartDateValue}
              label={'Start date'}
              setDate={setSelectedStartDate}
              handleSelectedEmptyStartDate={true}
              maxDate={selectedEndDate}
            />
            <DatePicker
              setDatelabel={setSelectedEndDateValue}
              date={selectedEndDateValue}
              label={'End date'}
              setDate={setSelectedEndDate}
              handleSelectedEmptyEndDate={true}
              minDate={selectedStartDate}
            />
            <Dropdown
              label={selectedPublishValue}
              startIconSrc={''}
              isOpen={publishOpen}
              handleClick={handlePublishClick}
              boxWidth="max-width"
              justifyContent="space-between"
              filterLabel={FILES.PUBLISH}
              options={publishSettingOptions}
              filterOpen={publishOpen}
            ></Dropdown>
          </LeftFilterGrid>
          <RightFilterGrid>
            <Dropdown
              label={FILES.MOST_RELEVANT}
              startIconSrc={'assets/icons/swap.svg'}
              isOpen={true}
              justifyContent="space-between"
              filterLabel={''}
              options={[]}
              filterOpen={false}
              handleClick={handleTestClick}
            ></Dropdown>
            <Filter />
          </RightFilterGrid>
        </FilterGrid>
        <TabsGrid sx={{ borderBottom: '1px solid #F4F5F5' }}>
          <Tabs
            tabItems={fileTabItems}
            sx={customTabStyle}
            activeIndex={0}
          ></Tabs>
        </TabsGrid>
        <FilesGrid>
          {filteredPresentationArray.map((presentation) => (
            <Box
              key={presentation.id}
              onClick={() => props.handleFileClick(presentation.id)}
            >
              <PresentationCard
                imgSrc={presentation.imgSrc}
                imgAlt={presentation.imgAlt}
                documentTitle={presentation.documentTitle}
                iconSrc={presentation.iconSrc}
                iconAlt={presentation.iconAlt}
                createdAt={presentation.createdAt}
              />
            </Box>
          ))}
        </FilesGrid>
      </ParentGrid>
    </>
  );
};

export default Files;
