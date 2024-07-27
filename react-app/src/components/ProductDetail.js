import React, { useState, useEffect } from 'react'
import Header from './Header';
import { useParams } from 'react-router-dom'
import Category from './Category';
export default function ProductDetail() {
    const [product,setProduct]=useState({});
    const pId=useParams();
    //console.log(productId);
    const fetchDetails=async()=>{
        const response=await fetch('http://localhost:4000/api/get-product-details/'+pId.productId,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
          });
          const res=await response.json();
          setProduct(res.product);
        }
useEffect(async()=>{
    fetchDetails();
},pId)
  return (
    <div>
      <Header/>
      <Category/>
      <div className='d-flex' style={{paddingTop:"50px"}}>
        
        <img src={"http://localhost:4000/"+product.ProductImage} style={{height:"520px", width:"600px", marginLeft:"180px"}}/>
        <div className='shadow-lg bg-body rounded' style={{display:"inline-block",height:"200px", width:"500px",marginLeft:"30px"}}>
        <div className='m-4 h3'>
        <i class="fa-solid fa-indian-rupee-sign"> {product.ProductPrice}</i> 
        </div>
        <div className='ml-4' style={{fontSize:"20px"}}>
            Description: {product.ProductDescription}
        </div>
        </div>
      </div>
    </div>
  )
}
