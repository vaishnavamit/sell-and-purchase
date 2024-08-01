import React, { useState, useEffect } from 'react'
import Header from './Header';
import { useParams } from 'react-router-dom'
import Category from './Category';
export default function ProductDetail() {
     const [product,setProduct]=useState({});
     const [sellerDetails,setSellerDetails]=useState({});
     const [detail,setDetail]=useState({});
     const pId=useParams();
    //console.log(productId);
    const GetData=async()=>{
        const response=await fetch('http://localhost:4000/api/get-product-details/'+pId.productId,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
          });
          const res=await response.json();
          console.log(res.product.ProductDetail);
          setProduct(res.product);
          setSellerDetails(res.product.addedBy)
          setDetail(res.product.ProductDetail);
        }
useEffect(()=>{
    GetData();
},[pId])
  return (
    <div>
      <Header/>
      <Category/>
      <div className='d-flex' style={{paddingTop:"50px"}}>
       





{/* implementing carousel */}
  <div
  id="carouselExampleIndicators"
  className="carousel slide"
  data-ride="carousel"
>
  <ol className="carousel-indicators">
    <li
      data-target="#carouselExampleIndicators"
      data-slide-to={0}
      className="active"
    />
    <li data-target="#carouselExampleIndicators" data-slide-to={1} />
    <li data-target="#carouselExampleIndicators" data-slide-to={2} />
  </ol>
  <div className="carousel-inner">
  {product.ProductImage && product.ProductImage.length > 0 && (
    <>
    <div className="carousel-item active">
          <img src={"http://localhost:4000/" + product.ProductImage[0]} style={{ height: "520px", width: "600px", marginLeft: "180px", objectFit:"fill"}} alt="Product"/>
    </div>
    {
      product.ProductImage.map((val,idx)=>{

        if(idx!==0){
        return(
          <div className="carousel-item">
          <img src={"http://localhost:4000/" + val} style={{ height: "520px", width: "600px", marginLeft: "180px" }} alt="Product"/>
          </div>
          )
        }
      }
        )
      }
      </>
  )
    }
  </div>
  <a
    className="carousel-control-prev"
    href="#carouselExampleIndicators"
    role="button"
    data-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="sr-only">Previous</span>
  </a>
  <a
    className="carousel-control-next"
    href="#carouselExampleIndicators"
    role="button"
    data-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="sr-only">Next</span>
  </a>
</div>


        <div className='d-flex flex-column'>
        <div className='shadow-lg bg-body rounded' style={{display:"inline-block",height:"200px", width:"600px",marginLeft:"30px", overflowY: "auto"}}>
        <div className='m-4 h3'>
        <i class="fa-solid fa-indian-rupee-sign"> {product.ProductPrice}</i>
        </div>
        <div className='ml-4' style={{fontSize:"20px"}}>
            Description: {product.ProductDescription}
        </div>
        </div>
        <div className='shadow-lg bg-body rounded mt-5' style={{display:"inline-block",height:"270px", width:"600px",marginLeft:"30px",overflowY: "auto"}}>
          <h3 className='m-3'>Details: </h3>
          <hr></hr>
          {
            detail && Object.keys(detail).length > 0 &&
            Object.keys(detail).map((key)=>{
              return(
                <div className='d-flex justify-content-between' style={{width:"300px"}}>
                <div className='ml-3' style={{fontSize:"20px"}}>{key}:</div>
                <div style={{fontSize:"20px"}}>{product.ProductDetail[key]}</div>
                </div>
              )
            })
          }
        </div>
        </div>
      </div>
      <div className='shadow-lg bg-body rounded mt-5' style={{display:"inline-block",height:"300px", width:"800px", marginLeft: "180px" }}>
        <h3 className='m-3'>Seller Details: </h3>
        <hr></hr>
        {
        sellerDetails && Object.keys(sellerDetails).length > 0 &&
        Object.keys(sellerDetails).length!=0?(<div className='m-3 h5'>
        <div className='m-2'>Name: {sellerDetails.name}</div>
        <div className='m-2'>Email: {sellerDetails.email}</div>
        <div className='m-2'>mobile Number: {sellerDetails.mobileNumber}</div>
        <div className='m-2'>City: {product.District}</div>
        <div className='m-2'>State: {product.State}</div>
        </div>):<h5>Getting Owner Details... </h5>
      }
      </div>
    </div>
  )
}
