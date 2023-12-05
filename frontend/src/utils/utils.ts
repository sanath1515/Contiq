import { FILES } from './constants';
import { IPresentationProps } from './constants';

export const getIconSrc = (isOpen: boolean, label: string) => {
  if (
    (isOpen && label === FILES.FILE_TYPE) ||
    (isOpen && label === FILES.PUBLISH) ||
    (isOpen && label === FILES.START_DATE) ||
    (isOpen && label === FILES.END_DATE)
  ) {
    return 'chevron-up.svg';
  } else if (
    !isOpen &&
    label !== FILES.FILE_TYPE &&
    label !== FILES.PUBLISH &&
    label !== FILES.START_DATE &&
    label !== FILES.END_DATE
  ) {
    return 'close.svg';
  }
  return 'chevron-down.svg';
};

type HandleOptions = (label: string) => void;

export function generateFileTypeOptions(
  handleOptionFileTypeClick: HandleOptions
) {
  const options = [
    {
      label: FILES.PDF,
      onClick: () => handleOptionFileTypeClick(FILES.PDF)
    },
    {
      label: FILES.PPT,
      onClick: () => handleOptionFileTypeClick(FILES.PPT)
    },
    {
      label: FILES.IMAGE,
      onClick: () => handleOptionFileTypeClick(FILES.IMAGE)
    }
  ];
  return options;
}

export function generatePublishSettingOptions(
  handleOptionPublishClick: HandleOptions
) {
  const publishSettingOptions = [
    {
      label: FILES.PUBLISHED_BY_ME,
      onClick: () => handleOptionPublishClick(FILES.PUBLISHED_BY_ME)
    },
    {
      label: FILES.PUBLISHED_SALES,
      onClick: () => handleOptionPublishClick(FILES.PUBLISHED_SALES)
    },
    {
      label: FILES.PUBLISHED_OTHERS,
      onClick: () => handleOptionPublishClick(FILES.PUBLISHED_OTHERS)
    }
  ];
  return publishSettingOptions;
}

export const handleTestClick = () => {};

export function filterPresentation(
  selectedStartDate: Date | undefined,
  selectedEndDate: Date | undefined,
  selectedFileExtension: string,
  presentationArray:IPresentationProps[]
) {
  return presentationArray.filter((presentation: IPresentationProps) => {
    const fileName = presentation.documentTitle.toLowerCase();
    const createdDate = new Date(presentation.createdAt);
    const createddate = createdDate.getFullYear()+'-'+(createdDate.getMonth()+1)+'-'+createdDate.getDate()
    const startdate = selectedStartDate?.getFullYear()+'-'+(selectedStartDate && selectedStartDate?.getMonth()+1)+'-'+selectedStartDate?.getDate()
    const endate = selectedEndDate?.getFullYear()+'-'+(selectedEndDate && selectedEndDate?.getMonth()+1)+'-'+selectedEndDate?.getDate()
    if (
      selectedFileExtension &&
      typeof selectedStartDate === 'undefined' &&
      typeof selectedEndDate === 'undefined'
    ) {
      return fileName.endsWith(selectedFileExtension);
    }else if (
      (!selectedStartDate || createddate >= startdate) &&
      (!selectedEndDate || createddate <= endate) &&
      !selectedFileExtension
    ) {
      return fileName;
    } else if (
      fileName.endsWith(selectedFileExtension) &&
      (!selectedStartDate || createddate >= startdate) &&
      (!selectedEndDate || createddate <= endate)
    ) {
      return fileName.endsWith(selectedFileExtension);
    }
  });
}
