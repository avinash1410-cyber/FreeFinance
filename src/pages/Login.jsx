import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5), 
      rgba(255, 255, 255, 0.5)
    ),
    url("https://source.unsplash.com/random") center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 75%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;

  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #3f51b5;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #303f9f;
  }
`;

const StyledLink = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: #3f51b5;
  text-align: center;

  &:hover {
    color: #303f9f;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ToggleButton = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #3f51b5;

  &:hover {
    color: #303f9f;
  }
`;

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Track if password is shown
  const handleNavigation = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    if (username && password) {
      loginUser(username, password);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOG IN</Title>
        <Form>
          <Input type="text" onChange={e => setUserName(e.target.value)} placeholder="Username" />
          <PasswordContainer>
            <Input 
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Password" 
            />
            <ToggleButton onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </ToggleButton>
          </PasswordContainer>
          <Button onClick={handleSubmit}>LOGIN</Button>
          <StyledLink onClick={() => handleNavigation('/forgot-password')}>DO NOT YOU REMEMBER THE PASSWORD?</StyledLink>
          <StyledLink onClick={() => handleNavigation('/register')}>CREATE A NEW ACCOUNT</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;