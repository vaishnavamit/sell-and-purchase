import React, {useState} from 'react'
import Header from './Header'
import { Link,useNavigate } from 'react-router-dom'
export default function Login() {
  const navigate=useNavigate();
  const [credentials,setCredentials]=useState({email:"",password:""});

  const handleOnChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value});
  }

  const handleFinalSubmit=async(e)=>{
    e.preventDefault();
    const response= await fetch("http://localhost:4000/api/login",{
      method:'Post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:credentials.email, password: credentials.password})
    })
    const json=await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem("authToken",json.authToken);
      localStorage.setItem("userId",json.userId);
      navigate("/");
    }
      alert(json.msg);
  }

  return (
    <>
    <Header/>
    <h5 style={{textAlign:"center",marginTop:"10px"}}>WelCome to Login Page</h5>
    <div className='d-flex flex-column align-items-center'>
    <form className='border border-dark p-5' style={{marginTop:"100px"}} onSubmit={handleFinalSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email" name="email" value={credentials.email}
      className="form-control" style={{width:"550px"}}
      id="exampleInputEmail1"
      aria-describedby="emailHelp" onChange={handleOnChange}
    />
    <div id="emailHelp" className="form-text">
      We'll never share your email with anyone else.
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password" name="password" value={credentials.password}
      className="form-control" style={{width:"550px"}}
      id="exampleInputPassword1" onChange={handleOnChange}
    />
  </div>
  <div>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
  <Link to="/createnewaccount" className='btn bg-danger ml-3'>Do Not Have Account</Link>
  </div>
</form>
</div>
    </>
  )
}