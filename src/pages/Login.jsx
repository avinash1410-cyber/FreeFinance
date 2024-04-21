
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import {Form,Title,Wrapper,Input,Container,Link,Button} from "../components/Helpers";



const Login = () => {


  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleNavigation = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    username.length > 0 && loginUser(username, password);
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOG IN</Title>
        <Form>
        <Input type="text" onChange={e => setUserName(e.target.value)} placeholder="username" />
        <Input type="password" onChange={e => setPassword(e.target.value)} placeholder="password" />
          <Button onClick={handleSubmit}>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={() => handleNavigation('/register/')}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
