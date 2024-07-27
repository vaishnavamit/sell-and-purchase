import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function Cards(props) {
    const navigate=useNavigate();
    const items=props.items;
    const handleOnClickHeart= async(productId,e)=>{
        const userId=localStorage.getItem("userId");
        if(!userId){
            navigate('/login');
            return;
        }

//Add to wishlist on clicking on heart: 
        const response=await fetch("http://localhost:4000/api/add-to-wishlist",{
            method:'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({productId: productId, userId: userId})
        })
        const json= await response.json();
        if(json.success){
          alert("Added to wishlist")
        }
        else{
          console.log(json.msg);
          alert("Error in adding to wishlist")
        }
    }

//Navigate to individual product details on clicking on a card: 
        const handleOnClickCard=(itemId)=>{
          navigate('/product/'+itemId);
        }



  return (
  <div className='m-3'>
    <div className="card" onClick={()=>{handleOnClickCard(items._id)}}>
        <img src={"http://localhost:4000/"+items.ProductImage} className="card-img-top" alt="..." />
        {
          props.callFromHome?(
        <div style={{position:"absolute", fontSize:"25px", backgroundColor:"white", borderRadius:"25px", margin:"3px", height:"45px", width:"45px"}}>
        <i className="fa-solid fa-heart" style={{margin:"9px"}} onClick={(e)=>{handleOnClickHeart(items._id,e)}}></i>
        </div>):""
        }
        <div className="card-body">
          <h5 className="card-title"><i class="fa-solid fa-indian-rupee-sign"></i> {items.ProductPrice}</h5>
          <p className="card-text">{items.ProductName}</p>
          <a href="#" className="btn btn-primary"></a>
        </div>
      </div>
      </div>
  )
}