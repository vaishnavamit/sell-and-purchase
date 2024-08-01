import React, {useState} from 'react';
import { Link } from 'react-router-dom';
export default function Signup() {

  const [credentials, setCredentials]=useState({name:"",mobileNumber:"",email:"",password:""});

  const handleOnChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }

  const handleFinalSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:4000/api/signup",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name: credentials.name, email: credentials.email,password: credentials.password,mobileNumber: credentials.mobileNumber})
    });
    const json=await response.json();
    console.log(json);
      alert(json.msg);
  }


  return (
    <div>
      <h4 style={{textAlign:"center",marginTop:"10px"}}>WelCome to Signup Page</h4>
      <div className='d-flex flex-column align-items-center'>
      <form className='border border-dark p-5' style={{marginTop:"100px", width:"800px"}} onSubmit={handleFinalSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Name
    </label>
    <input
      type="text" name="name" value={credentials.name}
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp" onChange={handleOnChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Mobile Number
    </label>
    <input
      type="text" name="mobileNumber" value={credentials.mobileNumber}
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp" onChange={handleOnChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email" name="email" value={credentials.email}
      className="form-control"
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
      className="form-control"
      id="exampleInputPassword1" onChange={handleOnChange}
    />
  </div>
  <button type="submit" className="btn btn-primary" >
    Submit
  </button>
  <Link to="/login" className='btn bg-danger ml-3'>Already a User</Link>
</form>
</div>
    </div>
  )
}