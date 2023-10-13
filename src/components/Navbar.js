import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Cart from "../screens/Cart.js";
import Modal  from "../Modal.js";
import {useCart} from "./ContextReducer.js"
import { styled}from '@mui/material';
import myImage from "../Black_and_White_Modern_Restaurant_Logo.png";
import '../App.css';
const Image=styled('img')({
    width:'75px',
    display:'flex',
    margin:'auto',
    padding:'0 0 0'
})


//as we can see in our page that for <a> anchor tag in the navbar whenever we click on the anchor tag this refresh the page cause in anchor tag there is href that pass us to the next page whenever we click on the navbar element but we want to make a single page web app for that we need to know what is react-router-dom 
export default function Navbar() {
    const [cartView,setCartView]=useState(false);
    let data=useCart();
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("authToken");
        navigate("/login");
    }
  return (
    <div>
        <nav className="navbar navbar-expand-sm navbar-dark navbar-scrolled shadow-lg  bg-body-tertiary rounded">
            <div className="container-fluid">
            <Image src={myImage} alt="GOOD-FOOD" />
                <Link className="navbar-brand fs-3 fst-italic text-dark mx-2" to="/">GOOD-FOOD</Link>
                <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2">
                        <li className="nav-item">
                            <Link className="nav-link active fs-9 text-white bg-dark btn mx-2" aria-current="page" to="/">Home</Link>
                        </li>
                        {(localStorage.getItem("authToken"))?
                            <li className="nav-item">
                                <Link className="nav-link active fs-9 text-light bg-dark btn mx-2" aria-current="page" to="/myOrder">My Orders</Link>
                            </li>
                        :" "}
                    </ul>
                  
                    {(!localStorage.getItem("authToken"))?
                        <div className="d-flex">
                            <Link className="btn text-white bg-dark mx-1" to="/login">Login</Link>
                            <Link className="btn text-white bg-dark mx-1" to="/createuser">Signup</Link>
                        </div>

                    :
                    <div>
                        <div className="btn text-white bg-dark mx-2" onClick={()=>{setCartView(true)}}>My Cart {" "}
                        <Badge pill bg="warning">{data.length}</Badge>
                        </div>
                        {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null}
                        <div className="btn text-info bg-mute mx-2" onClick={handleLogout}>LogOut</div>
                    </div>
                    }   
                </div>
            </div>
        </nav>
    </div>
  )
}





