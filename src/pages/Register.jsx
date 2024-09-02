import React, { useState } from 'react';
import styled from "styled-components";
import useNormalRequest from "../components/useNormalRequest";
import { useNavigate } from 'react-router-dom';

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
  width: 40%;
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

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const PasswordInput = styled(Input)`
  flex: 1;
`;

const ToggleButton = styled.button`
  margin-left: 10px;
  padding: 10px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
  text-align: center;
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

const LoginLink = styled.span`
  margin-top: 20px;
  font-size: 14px;
  text-align: center;

  a {
    color: #3f51b5;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { hitRequest } = useNormalRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await hitRequest('https://avi8654340.pythonanywhere.com/account/register/', 'POST', {
        username: username,
        email: email,
        password: password,
        phone: phone,
        add: address,
      }, () => navigate('/login'));
      console.log(data);
    } catch (error) {
      console.error('Error registering:', error);
      // Handle error, e.g., display a message to the user
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
          <Input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <PasswordContainer>
            <PasswordInput
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <ToggleButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </ToggleButton>
          </PasswordContainer>
          <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>Submit</Button>
          <LoginLink>
            Already have an account? <a href="/login">Login here</a>
          </LoginLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;