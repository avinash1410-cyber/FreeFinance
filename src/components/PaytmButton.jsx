import React, { useContext, useEffect, useState } from "react"
// const PaytmChecksum = require('paytmChecksum');
// const https = require('https');
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import ProtectedPage from "../views/ProtectedPage";
import Axios from "axios";
import styled from "styled-components";




const Payment = styled.div`
"bodyBackgroundColor": "#fafafb",
"bodyColor": "",
"themeBackgroundColor": "#0FB8C9",
"themeColor": "#ffffff",
"headerBackgroundColor": "#284055",
"headerColor": "#ffffff",
"errorColor": "",
"successColor": "",
"card": {
  "padding": "",
  "backgroundColor": ""
`;


export function PaytmButton () {
  const [address,SetAddress]=useState("");
  const [productid,SetProductId]=useState();
  const [userid,SetUserId]=useState();
  const [amount,SetAmount]=useState();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);



  const handleSuccess = (res) => {
    // separate key and values from the res object which is nothing but param_dict
    let keyArr = Object.keys(res);
    let valArr = Object.values(res);

    // when we start the payment verification we will hide our Product form
    document.getElementById("paymentFrm").style.display = "none";

    // Lets create a form by DOM manipulation
    // display messages as soon as payment starts
    let heading1 = document.createElement("h1");
    heading1.innerText = "Redirecting you to the paytm....";
    let heading2 = document.createElement("h1");
    heading2.innerText = "Please do not refresh your page....";

    //create a form that will send necessary details to the paytm
    let frm = document.createElement("form");
    frm.action = "https://securegw-stage.paytm.in/order/process/";
    frm.method = "post";
    frm.name = "paytmForm";

    // we have to pass all the credentials that we've got from param_dict
    keyArr.map((k, i) => {
      // create an input element
      let inp = document.createElement("input");
      inp.key = i;
      inp.type = "hidden";
      // input tag's name should be a key of param_dict
      inp.name = k;
      // input tag's value should be a value associated with the key that we are passing in inp.name
      inp.value = valArr[i];
      // append those all input tags in the form tag
      frm.appendChild(inp);
    });

    // append all the above tags into the body tag
    document.body.appendChild(heading1);
    document.body.appendChild(heading2);
    document.body.appendChild(frm);
    // finally submit that form
    frm.submit();

    // if you remember, the param_dict also has "'CALLBACK_URL': 'http://127.0.0.1:8000/api/handlepayment/'"
    // so as soon as Paytm gets the payment it will hit that callback URL with some response and
    // on the basis of that response we are displaying the "payment successful" or "failed" message
  };









  const startPayment = async () => {
    let body = {};
    console.log(location);

    body={
      'userid':user.user_id,
      'productid':location.state.productid,
      'address':address,
      'amount':location.state.amount
    };
    console.log(body);
    await Axios({
      url: 'https://bishellapi.herokuapp.com/paytm/pay/',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: body,
    }).then((res) => {
      console.log(body);
      console.log(res);
      if (res) {
        handleSuccess(res.data.body);
      }
    }).catch((err)=>{
      console.log(err);
    });
  };














  // const makepayment = async () => {
  //   e.preventDefault();


  //   let form_data = new FormData();
  //   form_data.append('userid', user.user_id);
  //   form_data.append('productid', location.state.productid.id);
  //   form_data.append('address', address);
  //   let url = 'https://bishellapi.herokuapp.com/paytm/pay/';
  //   await axios.post(url, form_data, {
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     }
  //   })
  //       .then(res => {
  //         console.log(res.data);
  //       })
  //       .catch(err => console.log(err))
  // };

    return (
      <div id="paymentFrm" className="container" style={{ marginTop: "20vh" }}>
        <Payment>
          <h1>{location.state.product_name}</h1>
          <h1>{location.state.amount}</h1>
              For<ProtectedPage/> 
            <form>
              <label htmlFor="address">Address</label>
              <br></br>
              <input type="text" id="address" placeholder="Shipping Address" value={address} onChange={(e)=>SetAddress(e.target.value)}/>
            </form>
            <button onClick={startPayment}>Pay Now</button>
        </Payment>
      </div>
    )
}

export default PaytmButton;