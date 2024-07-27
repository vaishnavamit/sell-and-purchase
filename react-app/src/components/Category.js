import React from 'react'
import Categories from './CategoryList'
export default function Category(props) {
  const handleClickedItem=async(item)=>{
    const response=await fetch("http://localhost:4000/api/get-product-by-category?category="+item,{
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
  return (
    <>
    <div className='shadow bg-body rounded d-flex justify-content-center align-items-center' style={{height:"40px"}}>
        {Categories.map((items,idx)=>{
            return (<div className='ml-3 categoriesDisplay category-items-css' onClick={()=>{handleClickedItem(items)}}>
                {items}
            </div>)
        })}
    </div>
    </>
  )
}
