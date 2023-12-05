export const CONTINUE_WITH_GOOGLE = 'Continue with google';

export const SYNC_MODAL_CONSTANTS = {
  syncMessage: 'Sync In Progress',
  helperMessage: 'Closing this window will not interrupt your sync',
  estimated: 'Estimated time -',
  completed: 'Completed',
  gDriveIconPath: 'assets/icons/google-drive.svg',
  closeIconPath: 'assets/icons/close-white.svg'
};

export const SEARCH_PLACEHOLDER = 'Search';
export const SEARCH_RESULT = 'Search results';
export const OTHER_DOCUMENTS = 'Other documents';
export const UPLOAD_MODAL_CAPTION =
  'already exists in this location. Do you want to replace the existing file with a new version or keep both files?';
export const CANCEL_BUTTON_LABEL = 'Cancel';
export const UPLOAD_BUTTON_LABEL = 'Upload';
export const UPLOAD_OPTIONS = 'Upload options';

export const CHOOSE_OPTIONS = ['Sync entire drive', 'Sync folders'];
export const FORM_LABEL = 'Choose the folders to sync with contiq';
export const TEXT = 'Text copied';
export const PASSWORD_CONSTANTS = {
  SENT: 'Send',
  EMAIL: 'Email',
  RESET_PASSWORD: 'Reset Password',
  RESET_YOUR_PASSWORD: 'Reset your password',
  CONFIRM_NEW_PASSWORD: 'Confirm new password',
  NEW_PASSWORD: 'New Password',
  RESET_PASSWORD_CONTENT:
    'The verification mail will be sent to the mailbox please check it.',
  CREATE_PASSWORD: 'Create new password',
  CREATE_PASSWORD_CONTENT: 'Enter new password below to change your password.'
};

export const UPLOADING = 'Uploading 1/1';
export const PAGE = 'Page';
export const OF = 'of';

export const USER_MENU_OPTIONS = [
  {
    label: 'Profile',
    iconSrc: 'assets/icons/user2.svg',
    iconAlt: 'profile'
  },
  {
    label: 'Settings',
    iconSrc: 'assets/icons/settings2.svg',
    iconAlt: 'settings'
  },
  {
    label: 'Logout',
    iconSrc: 'assets/icons/logout2.svg',
    iconAlt: 'logout'
  }
];

export const NOTIFICATIONS_CARD_CONSTANTS = {
  label: 'Notifications',
  progressAnimSrc: 'assets/animations/loading_bars.gif',
  closeIconSrc: 'assets/icons/close.svg'
};

import HomeIcon from '../../public/assets/icons/home-icon.svg';
import OfficeIcon from '../../public/assets/icons/office.svg';
import PeopleIcon from '../../public/assets/icons/people.svg';
import CalenderIcon from '../../public/assets/icons/calender-icon.svg';
import FilesIcon from '../../public/assets/icons/file-disabled.svg';
import MetricsIcon from '../../public/assets/icons/metrics-icon.svg';

export interface NavListProps {
  id: number;
  alt: string;
  title: string;
  src: string;
}

export const NAV_LIST_DATA: NavListProps[] = [
  {
    id: 1,
    alt: 'home-icon',
    src: HomeIcon,
    title: 'Home'
  },
  {
    id: 2,
    alt: 'office-icon',
    src: OfficeIcon,
    title: 'office'
  },
  {
    id: 3,
    alt: 'people-icon',
    src: PeopleIcon,
    title: 'People'
  },
  {
    id: 4,
    alt: 'calender-icon',
    src: CalenderIcon,
    title: 'Calender'
  },
  {
    id: 5,
    alt: 'files-icon',
    src: FilesIcon,
    title: 'Files'
  },
  {
    id: 6,
    alt: 'metrics-icon',
    src: MetricsIcon,
    title: 'Metrics'
  }
];

export const APP_NAME = 'CONTIQ';
export const SIGN_UP = 'Sign Up';
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-z]{2,}(?:\.[a-z]{2})?$/;
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const NAME_REGEX = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
export const CREATE_ACCOUNT = 'Create account';
export const OR = 'OR';
export const ALREADY_HAVE_AN_ACCOUNT = 'Already have an account? ';
export const DONT_HAVE_ACCOUNT = 'Doesn’t have an account? ';
export const SIGN_IN = 'Sign In';
export const CREATE_A_PASSWORD_PLACEHOLDER = 'Create a password';
export const PASSWORD_LABEL = 'Password';
export const EMAIL_PLACEHOLDER = 'john@example.com';
export const EMAIL_LABEL = 'Email ID';
export const NAME_PLACEHOLDER = 'John Cena';
export const NAME_LABEL = 'Name';
export const VALID_EMAIL_ERROR_MESSAGE = 'Please enter valid email!';
export const VALID_PASSWORD_ERROR_MESSAGE = 'Please enter a valid password';
export const VALID_NAME_ERROR_MESSAGE = 'Please enter valid name';
export const REMEMBER_ME = 'Remember me';
export const FORGOT_PASSWORD = 'Forgot password?';

export const FILES = {
  FILE_TYPE: 'File type',
  PDF: 'PDF',
  PPT: 'PPT',
  IMAGE: 'Image',
  START_DATE: 'Start date',
  END_DATE: 'End date',
  PUBLISH: 'Publish setting',
  PUBLISHED_BY_ME: 'Published by me',
  PUBLISHED_SALES: 'Published by Sales team',
  PUBLISHED_OTHERS: 'Published by others',
  MOST_RELEVANT: 'Most relevant'
};

export const FILE_EXTENSION_MAP = {
  [FILES.PDF]: '.pdf',
  [FILES.PPT]: '.ppt',
  [FILES.IMAGE]: '.image'
};

export const PASSWORD_RESET = 'Password reset';
export const RESET_PASSWORD_CONTENT =
  'Your password has been successfully reset. Click below to login magically.';
export const CONTINUE_TEXT = 'Continue';

export const SEARCH_CARD_CONSTANTS = {
  headerIcons: [
    {
      iconSrc: 'assets/icons/chevron-up-light.svg',
      alt: 'up'
    },
    {
      iconSrc: 'assets/icons/chevron-down.svg',
      alt: 'down'
    }
  ],
  minimizeIcon: {
    iconSrc: 'assets/icons/minimize.svg',
    alt: 'minimize'
  },
  maximizeIcon: {
    iconSrc: 'assets/icons/maximize.svg',
    alt: 'maximize'
  },
  slideText: 'SLIDE',
  copyIconSrc: 'assets/icons/copy-light.svg',
  moreIconSrc: 'assets/icons/more.svg',
  copyText: 'Text copied'
};

export const UPLOAD_FILES_MODAL_CONSTANTS = {
  backIconSrc: 'assets/icons/back.svg',
  uploadFilesText: 'Upload files',
  closeIconSrc: 'assets/icons/close-white.svg',
  uploadTabItems: [
    { id: 1, name: 'Uploads', disabled: false },
    { id: 2, name: 'Cloud storage', disabled: false }
  ],
  uploadIconsSrc: 'assets/icons/upload-white.svg',
  dropFilesText: 'Drop your files here',
  chooseFilesText: 'Choose files',
  pdfIconSrc: 'assets/icons/pdf.svg',
  uploadText: 'Upload File',
  gdriveHelperText: 'Drag media here to upload or connect an account',
  cloudOptions: [
    { iconSrc: 'assets/icons/g-drive.svg', alt: 'Google Drive' },
    { iconSrc: 'assets/icons/dropbox.svg', alt: 'Dropbox' },
    { iconSrc: 'assets/icons/icloud.svg', alt: 'iCloud' },
    { iconSrc: 'assets/icons/terabox.svg', alt: 'TeraBox' }
  ]
};

type FolderType = { id: number; folderName: string };
export const FOLDERS_DATA: FolderType[] = [
  { id: 1, folderName: 'Zemoso decks' },
  { id: 2, folderName: 'Sample data' },
  { id: 3, folderName: 'Sample data' }
];

export type FilesDataType = {
  fileName: string;
  id: string;
  isChecked: boolean;
};

export type IPresentationProps = {
  id: number;
  imgSrc: string;
  imgAlt: string;
  documentTitle: string;
  iconSrc: string;
  iconAlt: string;
  createdAt: Date;
};

export const FILES_DATA: FilesDataType[] = [
  { fileName: 'Company overview', id: '1', isChecked: true },
  { fileName: 'Software agreement', id: '2', isChecked: true },
  { fileName: 'Sample data', id: '3', isChecked: false },
  { fileName: 'Sample data', id: '4', isChecked: false }
];

export const ADD_FILES = 'Add files';
export const BACK = 'Back';
export const SYNC = 'Sync';
export const ZEMOSO_DECKS = 'Zemoso decks';

export const presentationArray: IPresentationProps[] = [
  {
    id: 1,
    imgSrc: 'assets/images/Document2.png',
    imgAlt: 'profile.svg',
    documentTitle: 'Company Profile.pdf',
    iconSrc: 'assets/icons/pdf.svg',
    iconAlt: 'pdf.svg',
    createdAt: new Date('20-Sep-2023')
  },
  {
    id: 2,
    imgSrc: 'assets/images/Document2.png',
    imgAlt: 'transformation.svg',
    documentTitle: 'Company transformation.ppt',
    iconSrc: 'assets/icons/pdf.svg',
    iconAlt: 'pdf.svg',
    createdAt: new Date('20-Sep-2023')
  },
  {
    id: 3,
    imgSrc: 'assets/images/Document2.png',
    imgAlt: 'aggrement.svg',
    documentTitle: 'Company agreement.ppt',
    iconSrc: 'assets/icons/pdf.svg',
    iconAlt: 'pdf.svg',
    createdAt: new Date('20-Sep-2023')
  }
];

export const fileTabItems = [
  { id: 1, name: 'All files', disabled: false },
  { id: 2, name: 'Slides', disabled: true },
  { id: 3, name: 'Docs', disabled: true }
];
export const DAYS_OF_WEEK = new Map([
  ['Su', 'SUN'],
  ['Mo', 'MON'],
  ['Tu', 'TUE'],
  ['We', 'WED'],
  ['Th', 'THU'],
  ['Fr', 'FRI'],
  ['Sa', 'SAT']
]);

export const HOME_PAGE_CONSTANTS = {
  heading: 'Home',
  recentText: 'Recent',
  emptyIconSrc: 'assets/images/empty-state.png',
  fileNotAvailableText: 'No files availabe',
  syncText: 'Start by syncing your cloud storage to contiq'
};

export const searchProps = {
  searchQuery: 'Environmental Problems',
  totalResults: 10,
  currentResult: 2,
  fileTitle: 'Global Warming: A science overview',
  totalSlides: 20,
  currentSlide: 15,
  paragraph:
    'At the same time, their use contributes to environmental problems',
  filepath: './assets/data/sample.pdf'
};

export const user = {
  userId: 1,
  userName: 'John Doe',
  avatarUrl: 'assets/icons/Avatar.svg'
};

export const FILES_PAGE_CONSTANTS = {
  heading: 'File',
  buttonLabel: 'Add Files',
  addIconSrc: 'assets/icons/addIcon.svg'
};
export const SIGNIN_ERROR_MESSAGE =
  'Either username or password is incorrect. Please try again';
