import { Add, Remove } from "@material-ui/icons";
import { Link,useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import axios from "axios";
import React, { useState, useEffect, useContext } from 'react';
import useAxios from '../utils/useAxios'
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;


function ViewProduct(){
  const[Item,setItem]=useState(0);
  const{id}=useParams();
  console.log({id});
  const api = useAxios();
  const nav = useNavigate();
  const [product, setProduct] = useState(null);
  const {user}=useContext(AuthContext);

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/${id}`)
    .then((res)=>{
        setProduct(res.data);
        console.log(res.data);
    }).catch((err)=>{
        console.log(err);
    })
  },[]);





  function incr()
  {
  let item=Item+1;
  setItem(item);
  }
  
  function dcr()
  {
  let item=Item-1;
  setItem(item);
  }

  function addcart(){
    const res=api.get(`/cart/addData/${id}`);
    nav("/cart");
  }




  function addPay(){
    nav(`/pay/${id}`,{state:{productid:id,amount:product.price,product_name:product.name}});
  }


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={`http://bishellapi.herokuapp.com${product === null ? 'loading' : product.image}`} alt="Product Image"/>
        </ImgContainer>
        <InfoContainer>
          <Title>{product === null ? 'loading' : product.name}</Title>
          <Desc>
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
          </Desc>
          {/* <Desc>
            Artist:{product.artist.cust === null ? 'loading' : product.artist.cust.user.username}
          </Desc>
          <Desc>
            Category:{product.cat === null ? 'loading' : product.cat.name}
          </Desc> */}
          <Price>$ {product === null ? 'loading' : product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          
          <AddContainer>
            <AmountContainer>
              <Remove onClick={dcr}/>
              <Amount>{Item}</Amount>
              <Add onClick={incr}/>
            </AmountContainer>
            <Button onClick={addcart}>ADD TO CART</Button>
            <Button onClick={addPay}>Order Now </Button>
            {/* <Link to={`/pay/${item.id}`}> <LocalShipping /></Link> */}
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
    )
  
                    // <Link to={`/buy/${product === null ? '' : product.id}`} className="btn btn-dark">Buy</Link>
    
};

export default ViewProduct;
