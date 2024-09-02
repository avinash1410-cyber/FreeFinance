import styled from 'styled-components';

// Define a wrapper styled component to hold the two components side by side
// export const Wrapper = styled.div`
//   display: flex;
// `;

// Styled component for the first component
export const FirstComponent = styled.div`
  flex: 1; /* Take up all available space */
`;

// Styled component for the second component
export const SecondComponent = styled.div`
  flex: 1; /* Take up all available space */
`;

export const ThirdComponent = styled.div`
  flex: 1; /* Take up all available space */
`;


export const ItemContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;





export const Scrollable = styled.div`
  max-height: 500px; /* Set a fixed maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
`;



export const StockItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;



export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: white;
`;



export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

export const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

export const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;



export const Flex = styled.button`
  display: flex;
`;




export const CustomButton = styled.button`
  width: 30%;
  height: 20 px;
  margin: 2px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;