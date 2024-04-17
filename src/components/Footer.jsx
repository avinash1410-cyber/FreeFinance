import {
  Facebook,
  Instagram,
  LinkedIn,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>About</Logo>
        <Desc>
        We are on a mission to make trade simple and profitable for you.
        </Desc>
        <SocialContainer>
          
            <a href="https://www.facebook.com/">
            <SocialIcon color="3B5999"><Facebook />
            </SocialIcon>
            </a>
          

            <a href="https://instagram.com/">
            <SocialIcon color="E4405F"><Instagram />
            </SocialIcon></a>
          

          <a href="https://twitter.com/">
          <SocialIcon color="55ACEE"><Twitter /></SocialIcon>
          </a>
          
          
            <a href="https://www.linkedin.com/">
            <SocialIcon color="E60023"><LinkedIn />
            </SocialIcon></a>
          
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
        <ListItem><Link to="/">Home</Link></ListItem>
        <ListItem><Link to="/cart">Dashboard</Link></ListItem>
        <ListItem><Link to="/category/man">Report</Link></ListItem>
        <ListItem><Link to="/category/woman">Traders</Link></ListItem>
        <ListItem><Link to="/category/acessories">World Stocks</Link></ListItem>
        <ListItem><Link to="/profile">History</Link></ListItem>
        <ListItem><Link to="/order">Order Tracking</Link></ListItem>
        <ListItem><Link to="/wishlist">Watchlist</Link></ListItem>
        <ListItem><Link to="/t&c">Terms</Link></ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> Delhi,India
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +91 7827303969
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> avi8654340@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
