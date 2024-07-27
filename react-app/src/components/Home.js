import React, {useState,useEffect} from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import Cards from './Cards';
import Category from './Category';
export default function Home() {
  const [productData,setProductData]=useState([]);     //Data of all the product items will be stored in this after fetching from database and than will be used for displaying on homepage
  
  const GetData=async()=>{
    const response=await fetch('http://localhost:4000/api/get-product',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
    });
    const res=await response.json();
    setProductData(res.productData);
  }
  useEffect(()=>{
    GetData();
  },[])
  return (<>

  {/* Code to print header */}

    <div>
      <Header setProductData={setProductData}/>
    </div>
    <div>
      <Category setProductData={setProductData}></Category>
    </div>

  {/* Code to print all products */}

    <div className='row'>{
      productData.length!=0?
      productData.map((items,idx)=>{
        return(
        <div key={items._id} className='col-12 col-md-6 col-lg-3'> 
        <Cards items={items}></Cards>
        </div>
      )})
      :<div className='m-3 h3'> No items found</div>
    }
    </div>
    </>
  )
}
