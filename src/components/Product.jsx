import {
  SearchOutlined,
  LocalShipping,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;`
  ;

const Product = ({item}) => {
  return (


    <Link to={`/product/${item.id}`}>
      <Container>
      <div style={{ backgroundColor: 'black', padding: '10px', borderRadius: '5px', margin: '5px 0' }}>
      <p style={{ color: 'white' }}>{`Name: ${item === null ? 'loading' : item.name}`}</p>
      <p style={{ color: 'white' }}>{`Price: ${item === null ? 'loading' : item.price}`}</p>
      <p style={{ color: 'white' }}>{`Market Cap: ${item === null ? 'loading' : item.market_cap}`}</p>
      </div>
    </Container>
    </Link>

  );
};

export default Product;
