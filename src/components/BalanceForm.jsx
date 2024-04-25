import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from './Helpers2';
import { Balance } from '@mui/icons-material';
import CustomButton from './Button';
import useAxios from "../utils/useAxios";

const BalanceForm = () => {
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('');
  const [balance, setBalance] = useState(0);
  const api = useAxios();

  useEffect(() => {
    // Fetch balance data initially
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await api.get("http://127.0.0.1:8000/account/");
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (transactionType === 'deposit') {
      console.log('Deposit:', amount);
      try {
        const orderResponse = await api.post("http://127.0.0.1:8000/account/addBalance/", {"amount":amount});
        console.log("Order data:", orderResponse.data);
        // Update balance after successful request
        fetchBalance();
      } catch (error) {
        console.error('Error depositing:', error);
      }
    } else {
      console.log('Withdraw:', amount);
      try {
        const orderResponse = await api.post("http://127.0.0.1:8000/account/withdrawBalance/", {"amount":amount});
        console.log("Order data:", orderResponse.data);
        // Update balance after successful request
        fetchBalance();
      } catch (error) {
        console.error('Error withdrawing:', error);
      }
    }
    // Reset amount after submission
    setAmount(0);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <ButtonContainer>
        <StyledButton
          onClick={() => setTransactionType('withdraw')}
          active={transactionType === 'withdraw'}
        >
          Withdraw
        </StyledButton>
        <StyledButton
          onClick={() => setTransactionType('deposit')}
          active={transactionType === 'deposit'}
        >
          Deposit
        </StyledButton>
      </ButtonContainer>
      <p>Current Balance: {balance}</p>
    </Form>
  );
};

export default BalanceForm;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  background-color: ${props => props.active ? 'darkblue' : 'lightblue'};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.active ? 'darkblue' : 'blue'};
  }
`;
