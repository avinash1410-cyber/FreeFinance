import React, { useState } from 'react';
import styled from "styled-components";
import useNormalRequest from "../components/useNormalRequest";
import { Wrapper,Container,Title,Form,Input,Agreement,Button } from '../components/Items';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { hitRequest } = useNormalRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await hitRequest('http://127.0.0.1:8000/account/register/', 'POST', {
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
          <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="DELHI" />
          <Input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Avinash" />
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="avi****@gmail.com" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 7827******" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>Submit</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
