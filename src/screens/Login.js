import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {Box,TextField,Button,styled,Typography}from '@mui/material';
import myImage from "../Black_and_White_Modern_Restaurant_Logo.png";
const Component = styled(Box) `
    width:400px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/ 0.6);
    margin-top:5%;
`
const Wrapper=styled(Box) `
    padding:11px 19px ;
    display:flex;
    flex:1;
    flex-direction:column;
    &>div,&>button{
        margin-top:20px;
    }
`

const Text=styled(Typography) `
    text-align:center;
    margin-top:25px;
    color:grey;

`
const LoginButton=styled(Button)`
    text-transform:none;
    background:orange;
    color:white;
    height:40px;
`
const Image=styled('img')({
    width:'200px',
    display:'flex',
    margin:'auto',
    padding:'30px 0 0'
})
export default function Login() {

  const [credentials, setcredentials] = useState({email:"",password:""})
  let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        console.log(json);

        if(!json.success){
            alert("Enter valid credentials");
        }
        if(json.success){
            localStorage.setItem("authToken",json.authToken);
            localStorage.setItem("userEmail",credentials.email);
            console.log(localStorage.getItem("authToken"));
            navigate("/");
        }
    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  /* return (
    <>
    <div className='container'>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
                </div>   
                <button type="submit" className="m-3 btn btn-primary" >Submit</button>
                <Link to="/createuser" className="m-3 btn btn-danger">New User</Link>
            </form>
        </div>

  </>
    
  ) */

  return (
    <Component>
    {/* <Text style={{textAlign:'center', fontSize:'2rem',padding:'10px',color:'#88B04B'}}>GooD-FooD</Text> */}
                <Image src={myImage} alt="GOOD-FOOD" />
            <Box onSubmit={handleSubmit}>
                        <Wrapper>
                            <TextField type="email" variant="standard" placeholder='Username' name='email' value={credentials.email} onChange={onChange}/>
                            <TextField variant="standard" placeholder='Password' type="password" name='password' value={credentials.password} onChange={onChange} />

                            <LoginButton type="submit" variant="contained" onClick={handleSubmit} >Login</LoginButton>
                            <Text>OR</Text>
                            <Link to="/createuser" className="m-3 btn btn-success" >New User</Link>
                        </Wrapper>
            </Box>
        </Component>
  )

}
