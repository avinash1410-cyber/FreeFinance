import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import {Form,Title,Wrapper,Input,Container,Link,Button} from "../components/Helpers";

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
          <Input type="text" onChange={e => setUserName(e.target.value)} placeholder="username" />
          <div style={{ position: 'relative' }}>
            <Input 
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="password" 
            />
            <span 
              onClick={togglePasswordVisibility} 
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <Button onClick={handleSubmit}>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={() => handleNavigation('/register/')}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;