import styled from 'styled-components';





export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;





export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const First = styled.div`
  flex: 1;
`;

export const Second = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;