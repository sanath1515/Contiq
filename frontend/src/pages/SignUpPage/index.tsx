import { User } from '@src/utils/interfaces/User';
import { SignUp } from '../../components/organisms/Signup';
import LandingTemplate from '../../components/templates/LandingTemplate';
import React from 'react';
import { getUserByEmail, registerUser } from '@src/services';
import { useNavigate } from 'react-router';

const SignUpPage = () => {
  const navigate = useNavigate();
  const userDataFetch = async(user:User) => {
    try{
      const response = await getUserByEmail(user.email);
      if(response.status == 200){
        alert("user already exists. Please login")
      }
    }catch(error:any){
      if (error.response.status === 404) {
        try {
          await registerUser({
            name: user.name,
            email: user.email,
            password: user.password
          });
          navigate('/');
        } catch (error) {
          console.log('Registration error:', error);
        }
      } else {
        console.log('Error:', error);
      }
    }
  }
  const handleSignup = (user:User) => {
    userDataFetch(user);
  }
  return (
    <LandingTemplate
      rightBody={<SignUp handleSignUp={handleSignup}/>}
    ></LandingTemplate>
  );
};

export default SignUpPage;
