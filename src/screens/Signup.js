import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import myImage from "../Black_and_White_Modern_Restaurant_Logo.png";
const Component = styled(Box)`
    width:400px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/ 0.6);
    margin-top:5%;
    
`

const Wrapper = styled(Box)`
    padding:11px 19px ;
    display:flex;
    flex:1;
    flex-direction:column;
    &>div,&>button{
        margin-top:20px;
    }
`

const Text = styled(Typography)`
    text-align:center;
    margin-top:25px;
    color:grey;

`
const SignupButton = styled(Button)`
    text-transform:none;
    background:white;
    color:blue;
    height:40px;
    box-shadow:0 2px 5px 0 rgb(0 0 0/ 20%);

`
const Image=styled('img')({
    width:'200px',
    display:'flex',
    margin:'auto',
    padding:'30px 0 0'
})
export default function Signup() {
    
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials");
        }
        if (json.success) {
            navigate("/login");
        }
    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    /* return (
      <>
      <div className='container'>
              <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
                      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
                  </div>
                   <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Geolocation</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={onChange}/>
                  </div>
                      
                  <button type="submit" className="m-3 btn btn-primary" >Submit</button>
                  <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
              </form>
          </div>
    </>
      
    ) */
    return (
        
            <Component>
                {/* <Text style={{ textAlign: 'center', fontSize: '2rem', padding: '10px', color: '#88B04B' }}>GooD-FooD</Text> */}
                <Image src={myImage} alt="GOOD-FOOD" />
                <Box >
                    <Wrapper>
                        <TextField variant="standard" type="text" name='name' value={credentials.name} onChange={onChange} placeholder='Name' />
                        <TextField variant="standard" type="email" name='email' value={credentials.email} onChange={onChange} placeholder='Email' />
                        <TextField variant="standard" type="password" name='password' value={credentials.password} onChange={onChange} placeholder='Password' />
                        <TextField variant="standard" type="text" name='geolocation' value={credentials.geolocation} onChange={onChange} placeholder='Location' />

                        <SignupButton onClick={handleSubmit}>Signup</SignupButton>
                        <Text>OR</Text>
                        <Link to="/login" className="m-3 btn btn-success">Already a user</Link>
                    </Wrapper>

                </Box>
            </Component>
      
    )
}
