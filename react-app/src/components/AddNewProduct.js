import React from 'react'
import Header from './Header'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Categories from './CategoryList';

export default function AddNewProduct() {

    const [product, setProduct]=useState({category:Categories[0],name:"",description:"",price:""});
    const [pImage,setPImage]=useState('');
    const handleOnChange=(event)=>{
      console.log(event.target.name);
    setProduct({...product,[event.target.name]:event.target.value})
    }



    const handleFinalSubmit=async(e)=>{
        //console.log(pImage);
        e.preventDefault();
        const formData = new FormData();
        formData.append('category', product.category);
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('image', pImage);
        formData.append('userId',localStorage.getItem('userId'));
        console.log(formData);
        const response = await fetch("http://localhost:4000/api/add-product", {
            method: 'POST',
            body: formData,
        });
    const json=await response.json();
    if(json.success){
      alert("Product successfully added");
    }
    else{
      console.log(json.msg);
      alert("Product not added, try again");
    }
  }




  return (
  <>
    <Header/>
    <h2 className='ml-3'>Add New Product</h2>
    <form className='m-3' onSubmit={handleFinalSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label mr-3">
      Product Category:
    </label>
    <select name="category" value={product.category} onChange={handleOnChange}>
      {Categories.map((items,idx)=>{
        return (<option value={items} >{items}</option>)
      })}
    </select>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Product Name
    </label>
    <input
      type="text" name="name" value={product.name}
      className="form-control"
      id="exampleInputPassword1" onChange={handleOnChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Product Description
    </label>
    <input
      type="text" name="description" value={product.description}
      className="form-control"
      id="exampleInputPassword1" onChange={handleOnChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Price
    </label>
    <input
      type="number" name="price" value={product.price}
      className="form-control"
      id="exampleInputPassword1" onChange={handleOnChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Product Image
    </label>
    <input
      type="file" name="img"
      className="form-control" onChange={(e)=>{
        setPImage(e.target.files[0]);
      }}
    />
  </div>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
  <Link to="/createnewaccount" className='btn bg-danger'>Do Not Have Account</Link>
</form>
    </>
  )
}