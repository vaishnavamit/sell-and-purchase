import React, {useState} from 'react';
import { Link } from 'react-router-dom';
export default function Signup() {

  const [credentials, setCredentials]=useState({name:"",email:"",password:""});

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
      body:JSON.stringify({name: credentials.name, email: credentials.email,password: credentials.password})
    });
    const json=await response.json();
    console.log(json);
      alert(json.msg);
  }


  return (
    <div>
      <div>WelCome to Signup Page</div>
      <form onSubmit={handleFinalSubmit}>
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
  <Link to="/login" className='btn bg-danger'>Already a User</Link>
</form>
    </div>
  )
}