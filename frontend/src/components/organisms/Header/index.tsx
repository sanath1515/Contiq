import React, { useEffect, useRef, useState } from 'react';
import { Box, Stack, SxProps, Menu } from '@mui/material';
import { Typography } from '../../atoms/Typography/index';
import ButtonWithIcon from '../../atoms/IconButton/index';
import HelpIcon from '../../../../public/assets/icons/help.svg';
import AddUserIcon from '../../../../public/assets/icons/add user.svg';
import NotificationIcon from '../../../../public/assets/icons/notification.svg';
import theme from '../../../../src/theme/theme';
import styled from 'styled-components';
import { APP_NAME, SEARCH_PLACEHOLDER } from '../../../utils/constants';
import InputField from '@components/atoms/InputField';
import SearchIcon from '../../../../public/assets/icons/search.svg';
import Avatar from '@components/atoms/Avatar';
import Icon from '@components/atoms/Icon';
import UserMenu from '../UserMenu';
import SearchResults from '@components/molecules/SearchResults';
import { useNavigate } from 'react-router';
import NotificationsCard from '../NotificationsCard';
import { useNotification } from './hooks';
import { useUserContext } from '@src/utils/ThemeContext';
import SearchResultsCard1 from '../../../../public/assets/icons/searchresults-card1.svg';
import SearchResultsCard2 from '../../../../public/assets/icons/searchresults-card2.svg';
import { fetchSearchResults } from '@src/services';
import { fetchParagraphs } from '@src/services';
import { convertFragmentText } from './utils';

import axios from '@src/services/API';

export interface HeaderProps {
  user: {
    userName: string;
    userId: number;
    avatarUrl: string;
  };
  handleExtraProp: boolean;
}

const StyledClickableBox = styled(Box)`
  cursor: pointer;
`;

const ParentGrid = styled(Stack)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: linear-gradient(345.66deg, #7c2be8 10.18%, #05bdcd 108.2%);
`;
const LeftGrid = styled(Stack)`
  width: 5.56vw;
  height: 2.05vw;
  margin-top: 16px;
`;
const RightGrid = styled(Stack)`
  gap: 1.464vw;
`;
const ButtonStyles: SxProps = {
  '& .MuiButtonBase-root': {
    height: '44px',
    width: '44px'
  },
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '8px'
};
const searchInputStyles: SxProps = {
  width: '25.77vw',
  height: '44px',
  borderRadius: '6px',
  background: 'rgba(255,255,255,0.2)',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: 'none',
  '& fieldset': { border: 'none' },
  '& input': {
    '&::placeholder': {
      color: 'rgba(255,255,255,1)',
      fontFamily: 'Manrope-Regular',
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: '600'
    }
  },
  '& .MuiInputBase-root': {
    height: '44px'
  },
  '& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder': {
    color: theme.palette.textColor.white,
    opacity: 1
  }
};

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .css-6hp17o-MuiList-root-MuiMenu-list': {
    paddingTop: 0,
    paddingBottom: 0
  },
  '& .css-6hp17o-MuiList-root-MuiMenu-list.MuiBox-root': {
    width: '35vw'
  }
}));

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const currUserId = props.user.userId;
  const { handleUpdateFiles } = useUserContext();
  const {
    notificationCount,
    notificationsData,
    setNotificationCount,
    updateNotificationStatus,
    setNotificationsData,
    fetchNotififcationData,
    fetchAllNotifications,
    allNotifications
  } = useNotification(currUserId, props.user.userName);
  const [loading, setLoading] = useState(true);
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLDivElement>();

  const notificationRef = useRef<Element>(null);

  const navigate = useNavigate();

  const handleAvatarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setUserMenuAnchor(e.currentTarget);
    setIsAvatarClicked(!isAvatarClicked);
  };

  const handleCloseNotification = async () => {
    setShowNotification(false);
    setNotificationCount(0);
    setNotificationsData([]);
    await updateNotificationStatus();
  };
  const handleNotificationButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setShowNotification(true);
    setNotificationCount(0);
  };

  const fetchResults = async () => {
    try {
      const response = await fetchSearchResults(searchValue);
      setSearchData(response);
      setShowPopup(!showPopup);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const getFiles = (e: any) => {
    fetchResults();
  };

  const handleSearchClick = async (
    id: number,
    keyword: string,
    fileName: string
  ) => {
    const res = await fetchParagraphs(keyword, fileName, id);
    const { paragraphs, pages } = convertFragmentText(res.fragmentText);
    console.log('paragraphs', paragraphs);
    console.log('pages', pages);
    axios
      .get(`/files/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob'
      })
      .then((res) => {
        const binaryData = res.data;
        const blob = new Blob([binaryData], {
          type: 'application/pdf'
        });
        const pdfUrl = URL.createObjectURL(blob);
        navigate('/searchResults', {
          state: {
            pages: pages,
            paragraphs: paragraphs,
            pdfUrl: pdfUrl,
            keyword: keyword,
            fileName: fileName
          }
        });
      });
  };
  let notificationContent;
  if (loading) {
    notificationContent = null;
  } else {
    notificationContent =
      notificationCount === 0 ? allNotifications : notificationsData;
  }

  useEffect(() => {
    if (showNotification) {
      setLoading(true);
    }
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [showNotification]);
  useEffect(() => {
    fetchNotififcationData();
    fetchAllNotifications();
  }, [props.handleExtraProp]);
  return (
    <>
      <UserMenu
        anchorEl={userMenuAnchor}
        isOpen={isAvatarClicked}
        handleClose={() => setIsAvatarClicked(false)}
        userId={props.user.userId}
        userName={props.user.userName}
      ></UserMenu>
      <StyledMenu
        open={showPopup}
        anchorEl={searchRef.current}
        onClose={() => setShowPopup(false)}
      >
        <SearchResults
          SEARCH_DATA={searchData}
          IMAGES={[
            { id: 1, imageName: SearchResultsCard1 },
            { id: 2, imageName: SearchResultsCard2 }
          ]}
          onSearchClick={(fileId, keyword, fileName) => {
            handleSearchClick(fileId, keyword, fileName);
          }}
          onDocumentClick={() => {}}
          searchWord=""
          setShowPopup={showPopup}
        />
      </StyledMenu>

      <NotificationsCard
        isOpen={showNotification}
        notificationsData={notificationContent}
        handleNotificationClick={() => {
          handleUpdateFiles();
        }}
        handleClose={handleCloseNotification}
        anchorEl={notificationRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        anchorPosition={{
          top: 500,
          left: 10
        }}
      />

      <ParentGrid
        direction={'row'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <LeftGrid>
          <Typography
            variant="h3"
            color={theme.palette.textColor.white}
            sx={{ marginLeft: '1.46vw' }}
          >
            {APP_NAME}
          </Typography>
        </LeftGrid>
        <RightGrid direction={'row'} justifySelf={'flex-end'}>
          <StyledClickableBox onBlur={getFiles}>
            <InputField
              variant={'outlined'}
              label="Controlled"
              type={'text'}
              placeholder={SEARCH_PLACEHOLDER}
              startIcon={
                <img
                  src={SearchIcon}
                  alt=""
                  height={'20px'}
                  width={'20.01px'}
                />
              }
              onChange={handleSearchChange}
              value={searchValue}
              sx={searchInputStyles}
              innerRef={searchRef}
            ></InputField>
          </StyledClickableBox>
          <Stack
            alignItems={'center'}
            gap={theme.spacing(4)}
            paddingTop={theme.spacing(2)}
            paddingBottom={theme.spacing(2)}
            flexDirection={'row'}
            justifySelf={'flex-end'}
            paddingRight={theme.spacing(5)}
          >
            <ButtonWithIcon
              startIconPath={HelpIcon}
              sx={ButtonStyles}
              variant="text"
              iconWidth="24px"
              iconHeight="24px"
              testId="help-button"
              height={theme.spacing(11)}
              width={theme.spacing(11)}
            ></ButtonWithIcon>
            <ButtonWithIcon
              startIconPath={AddUserIcon}
              sx={ButtonStyles}
              iconWidth="24px"
              iconHeight="24px"
              testId="add-user-button"
              height={theme.spacing(11)}
              width={theme.spacing(11)}
            ></ButtonWithIcon>
            <ButtonWithIcon
              startIconPath={NotificationIcon}
              sx={ButtonStyles}
              iconWidth="24px"
              iconHeight="24px"
              onClick={handleNotificationButtonClick}
              testId="notification-button"
              badgeCount={notificationCount}
              height={theme.spacing(11)}
              width={theme.spacing(11)}
              innerRef={notificationRef}
            ></ButtonWithIcon>
            <Stack
              direction={'row'}
              alignItems={'center'}
              gap={theme.spacing(2)}
              padding={`${theme.spacing(1)} ${theme.spacing(2)}`}
              borderRadius={theme.spacing(2)}
              sx={{
                background: isAvatarClicked ? 'rgba(209, 215, 224,0.5)' : ''
              }}
            >
              <StyledClickableBox onClick={handleAvatarClick}>
                <Avatar
                  src={props.user.avatarUrl}
                  alt={props.user.userName}
                  innerRef={avatarRef}
                ></Avatar>
              </StyledClickableBox>
              {isAvatarClicked && (
                <Icon
                  style={{ height: theme.spacing(6), width: theme.spacing(6) }}
                  src="assets/icons/chevron-down-white.svg"
                  alt="down"
                ></Icon>
              )}
            </Stack>
          </Stack>
        </RightGrid>
      </ParentGrid>
    </>
  );
};

export default Header;
