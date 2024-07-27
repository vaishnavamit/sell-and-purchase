import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
export default function Header(props) {
  const navigate=useNavigate();
  const [search,setSearch]=useState("");

  const handleSearchButton=async()=>{
    const trimmedSearch=search.trim();
    if(trimmedSearch==""){
      return;
    }
    console.log(trimmedSearch);
    const response=await fetch("http://localhost:4000/api/get-product-by-search-btn?searchItem="+trimmedSearch,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
    })
    const res=await response.json();
    console.log(res.product);
    if(res.success){
    props.setProductData(res.product);
    }
    else{
      alert("error in fetching data");
    }
  }
  const handleLogout=(e)=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate("/");
  }


  const handleHeaderRightPart=()=>{
      if(!localStorage.getItem("authToken")){
      return (<div className='d-flex'>
        <Link className='login-link login-css' to="/login">Login</Link>
        <div className='d-flex align-items-center mr-5 pt-3 h5'>
        <button className='border-5' style={{height:"44px", width:"90px"}} onClick={()=>{navigate('/login')}}>
        <span className='m-2'><i class="fa-solid fa-plus"></i></span>
        <span>Sell</span>
        </button>
      </div>
      </div>
      )
    }
      else{
      return(
        <div className='d-flex pt-2'>
        <Link to="/wishlist" className='d-flex align-items-center mr-3 h5 wishlist-css'>WishList</Link>
        <div className='d-flex align-items-center mr-3 p-3 h5'>
        <button className='border-5 sellBtn-css'  onClick={()=>{navigate('/addproduct')}}>
        <span className='m-2'><i class="fa-solid fa-plus"></i></span>
        <span>Sell</span>
        </button>
      </div>
      <button className='m-3 logout-css' onClick={handleLogout}>Logout</button>
      </div>
      )
    }
  }

  return (
    <div className='d-flex justify-content-between align-items-center shadow bg-body rounded whole-header-css'>
      <div>
        <Link to="/" className='h4 ml-3 sell-and-purchase-css'>
          Sell & Purchase
        </Link>
        <span className='ml-4'>
          <input type='text' className='border-4 border-dark rounded-left pl-2 search-input-css' placeholder='Find Cars, Mobile Phones and more...' onChange={(e)=>{setSearch(e.target.value)}}/>
          <button className='search-btn-css' onClick={handleSearchButton}>
            <i class="fa-solid fa-magnifying-glass">
            </i>
          </button>
        </span>
      </div>
      <div>
      </div>
      <div>
      {
        handleHeaderRightPart()
      }
      </div>
      

    </div>
  )
}