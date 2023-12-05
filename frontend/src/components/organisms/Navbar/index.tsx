import React, { useState } from 'react';
import { Box, Stack, styled } from '@mui/material';
import { NAV_LIST_DATA, NavListProps } from '@src/utils/constants';
import IconWithTypography from '@components/molecules/IconWithTypography';
import Icon from '@components/atoms/Icon';
import SettingsIcon from '../../../../public/assets/icons/settings.svg';
import theme from '@src/theme/theme';
import ActiveHomeIcon from '../../../../public/assets/icons/Home.svg';
import ActiveFilesIcon from '../../../../public/assets/icons/file-active.svg';
import { useNavigate } from 'react-router';

interface NavbarProps {
  activeTab: string;
}

const StyledOutline = styled(Stack)({
  width: '6vw',
  height: '100%',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.grey[500]
});

const StyledInnerStack = styled(Stack)({
  justifyContent: 'center',
  alignItems: 'center'
});

const StyledFoooter = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-end',
  marginBottom: '2.04vw'
});

const StyledNavbarOption = styled(Stack)({
  justifyContent: 'center',
  width: '6vw',
  height: '5.56vw',
  '&:hover': {
    backgroundColor: `${theme.palette.grey[400]}`
  },
  color: theme.palette.grey[200]
});

export const Navbar = ({ activeTab }: NavbarProps) => {
  const [active, setActive] = useState<string>(activeTab);
  const navigate = useNavigate();

  const handleNavClick = (title: string) => {
    if (title === 'Home' || title === 'Files') {
      setActive(title);
    }
    if (title == 'Home') {
      navigate('/home');
    }
    if (title == 'Files') {
      navigate('/files');
    }
  };

  const getIconSrc = (itemTitle: string, activeTab: string, src: string) => {
    if (itemTitle === 'Home' && activeTab === 'Home') {
      return ActiveHomeIcon;
    } else if (itemTitle === 'Files' && activeTab === 'Files') {
      return ActiveFilesIcon;
    } else {
      return src;
    }
  };

  return (
    <StyledOutline data-testid="navigation">
      <StyledInnerStack>
        {NAV_LIST_DATA.map((item: NavListProps, index) => (
          <StyledNavbarOption
            key={item.id}
            data-testid={`nav-item-${item.title}`}
            sx={{
              ':hover': {
                cursor:
                  index == 1 || index == 2 || index == 3 || index == 5
                    ? ''
                    : 'pointer'
              },
              backgroundColor:
                item.title === active ? `${theme.palette.grey[400]}` : '',
              color:
                item.title === active ? `${theme.palette.textColor.white}` : ''
            }}
            onClick={() => handleNavClick(item.title)}
          >
            <IconWithTypography
              key={item.id}
              iconSrc={getIconSrc(item.title, active, item.src)}
              label={item.title}
              iconAlt={item.alt}
            />
          </StyledNavbarOption>
        ))}
      </StyledInnerStack>
      <StyledFoooter>
        <Icon src={SettingsIcon} alt="settings-icon" />
      </StyledFoooter>
    </StyledOutline>
  );
};
