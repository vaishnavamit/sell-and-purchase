import React, {useState,useEffect} from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import Cards from './Cards';
import Category from './Category';

export default function WishList() {
    const [productData,setProductData]=useState([]);     //Data of all the product items will be stored in this after fetching from database and than will be used for displaying on homepage
    
    const GetData=async()=>{
      const userId=localStorage.getItem("userId");
      console.log(userId);
      const response=await fetch('http://localhost:4000/api/get-wishlist-item',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({userId})
      });
      const res=await response.json();
      if(res.success){
      setProductData(res.wishListData);
      }
      else{
        console.log(res.msg);
      }
    }
    useEffect(()=>{
      GetData();
    },[])
    return (<>
  
    {/* Code to print header */}

    <div>
      <Header setProductData={setProductData} getData={GetData}/>
    </div>
    <div>
      <Category setProductData={setProductData}></Category>
    </div>

  {/* Code to print all wishlisted products */}

      <div className='row'>{
        productData!=[]?
        productData.map((items,idx)=>{
          return(
          <div key={items._id} className='col-12 col-md-6 col-lg-3'> 
          <Cards items={items}></Cards>
          </div>
        )})
        :<div>No items present</div>
      }
      </div>
      </>
    )
}
