import{React,useState,useEffect} from "react"
import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    axios.get("https://bishellapi.herokuapp.com/category/available/")
    .then((res)=>{
      setCategories(res.data);
    }).catch((err)=>{
        console.log(err);
    })
  },[]);



  
  return (
    <div>
        <h1>Status for Today</h1>
    <Container>      
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
    <br></br>
    <Link to="/category">seeMore</Link>
    </div>
  );
};

export default Categories;
