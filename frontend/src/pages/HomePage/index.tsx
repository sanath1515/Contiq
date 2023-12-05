import Header from '@components/organisms/Header';
import { Navbar } from '@components/organisms/Navbar';
import { HomeTemplate } from '@components/templates/HomeTemplate';
import { Box, styled } from '@mui/material';
import theme from '@src/theme/theme';
import React, { useEffect } from 'react';
import { BodyContent } from './components';
import { useUserContext } from '@src/utils/ThemeContext';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserByEmail, login, registerUser } from '@src/services';

const StyledScrollableBox = styled(Box)`
  height: 100vh;
  overflow-y: auto;
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

const HomePage = () => {
  const { user } = useAuth0();
  const { currUser, handleUpdateCurrUser } = useUserContext();
  const userData = {
    userId: currUser.id,
    userName: currUser.name,
    avatarUrl: 'assets/icons/Avatar.svg'
  };
  useEffect(() => {
    const userDataFetch = async () => {
      try {
        if (user?.email && user?.name) {
          const email = user.email;
          const userResponse = await getUserByEmail(email);
          if(userResponse.status == 200){
            handleUpdateCurrUser(userResponse.data.id, userResponse.data.name, userResponse.data.email);
          }
          const response = await login(email, 'Password@123');
          localStorage.setItem("token",response.data);
        }
      } catch (error:any) {
        if (error.response && error.response.status === 404 && user?.email && user?.name) {
          try {
            await registerUser({
              name: user.name,
              email: user.email,
              password: "Password@123"
            });
            const userResponse = await getUserByEmail(user.email);
            if(userResponse.status == 200){
              handleUpdateCurrUser(userResponse.data.id, userResponse.data.name, userResponse.data.email);
            }
            const response = await login(user.email, 'Password@123');
            localStorage.setItem("token",response.data);
          } catch (error) {
            console.log('Registration error:', error);
          }
        } else {
          console.log('Error:', error);
        }
      }
    };
    userDataFetch();
  }, [user]);
  return (
    <HomeTemplate
      sidebar={<Navbar activeTab={'Home'} />}
      header={<Header user={userData} handleExtraProp={false}></Header>}
      content={<BodyContent userId={userData.userId} />}
    ></HomeTemplate>
  );
};

export default HomePage;
