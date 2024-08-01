import React from 'react'
import Header from './Header'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Categories from './CategoryList';

export default function AddNewProduct() {

    const [product, setProduct]=useState({category:Categories[0],name:"",description:"",price:"",district:"",state:""});
    const [pImage,setPImage]=useState([]);
    const [addItem,setAddItem]=useState(0);
    const [pKeyValue,setPKeyValue]=useState({});
    const [pDetails,setPDetails]=useState({});
    const [idx,setIdx]=useState(0);
    const [fillPrevProDetails,setFillPrevProDetails]=useState(0);
    const handleOnChange=(event)=>{
    setProduct({...product,[event.target.name]:event.target.value})
    }


    const addNewDetail=()=>{
      console.log(pKeyValue);
      if(idx!=0&&(pKeyValue[`key${idx}`]==""||pKeyValue[`key${idx}`]==undefined||pKeyValue[`value${idx}`]==""||pKeyValue[`value${idx}`]==undefined)){
        setFillPrevProDetails(1)
        setTimeout(() => {
          setFillPrevProDetails(0);
        }, 10000);
        return;
      }
      const nIdx=idx;
      setIdx(nIdx+1);
    }



    const handleFinalSubmit=async(e)=>{
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('category', product.category);
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        pImage.forEach((image, index) => {
          formData.append('images', image); // 'images' should be the same as your backend expects
        });
        formData.append('district', product.district);
        formData.append('state', product.state);
        formData.append('productDetails', JSON.stringify(pDetails));
        formData.append('userId',localStorage.getItem('userId'));
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


  const handleDetailInputChange=(e,index)=>{
    const {name,value}=e.target;
    setPKeyValue((prevInputs) => ({
      ...prevInputs,
      [`${name}${index + 1}`]: value
    }))
  }


  const saveDetails=(e)=>{
    e.preventDefault();
        Array.from({ length: idx }).map(async(_, index) => {
          if(pKeyValue[`key${index + 1}`]==""||pKeyValue[`key${index + 1}`]==undefined){
            
          }
          else if(pKeyValue[`value${index + 1}`]==""||pKeyValue[`value${index + 1}`]==undefined){
            
          }
          else{
          setPDetails((prevState)=>({
            ...prevState,[pKeyValue[`key${index + 1}`]]:pKeyValue[`value${index + 1}`]
          }))
      }
    })
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
      Product Details:  Please Note Details will appear in the order they are added 
    </label>{
    Array.from({ length: idx }).map((_, index) => (
    <div className="d-flex">
    <input
      type="text" style={{width:"200px"}} name='key' placeholder={`eg. Year of Purchase`} onChange={(e)=>handleDetailInputChange(e,index)}
      className="form-control m-3"
      id="exampleInputPassword1"
    />
    <input
      type="text" style={{width:"300px"}} name='value' placeholder={`2018`}  onChange={(e)=>handleDetailInputChange(e,index)}
      className="form-control m-3"
      id="exampleInputPassword1"
    />
    </div>
    )
    )
  }<div>
  <span className="add-detail-in-add-new-product-css" style={{textDecoration:"underline"}} onClick={addNewDetail}> Add detail</span>
  <button className="btn-secondary m-3" onClick={saveDetails}>Submit Feature Details</button>
  </div>
  {
    fillPrevProDetails?(<span className="ml-3 text-danger">Please, fill previously added detail boxes</span>):""
  }
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
      multiple // Allow multiple files
      onChange={(e) => setPImage(Array.from(e.target.files))}
      className="form-control"
    />
  </div>
  <h5>Address: </h5>
  <div className='d-flex'>
  <div className="m-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      City/District
    </label>
    <input
      type="text" name="district" value={product.district} style={{width:"400px"}}
      className="form-control" placeholder='eg. Jaipur'
      id="exampleInputPassword1" onChange={handleOnChange}
    />
  </div>
  <div className="m-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      State
    </label>
    <input
      type="text" name="state" value={product.state} style={{width:"400px"}}
      className="form-control" placeholder='eg. Rajasthan'
      id="exampleInputPassword1" onChange={handleOnChange}
    />
  </div>
  </div>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
  <Link to="/createnewaccount" className='btn bg-danger'>Do Not Have Account</Link>
</form>
    </>
  )
}