import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: '200px';
  height: '100px';
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;


const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:black;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;




const CategoryItem = ({item}) => {

  let navigate = useNavigate();
  function handleClick(event) {
    event.preventDefault();
    navigate(`/category/${item.id}`, {category:item.id});
  }


  return (
    <Container>
      <ImgContainer>
            <Image src={`https://bishellapi.herokuapp.com${item === null ? 'loading' : item.image}`} height="400px"/>
      </ImgContainer>
      <Info>
        <Button onClick={handleClick}>SHOP NOW</Button>
        <Title>{item.name}</Title>
      </Info>
    </Container>
  );
};

export default CategoryItem;