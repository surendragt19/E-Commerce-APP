import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import ADminMenu from '../../components/layout/ADminMenu'
import toast from 'react-hot-toast';
import axios from 'axios'

const Create_Product = () => {
  const[name,setName]=useState("")
  const[description,setDescription]=useState("")
  const[price,setPrice]=useState("")
  const[category,setCategory]=useState("")
  const[quantity,setQuantity]=useState("")
  const[photo,setPhoto]=useState("")
  const [shipping, setShipping] = useState("");
            const handleSubmit = async (e) => {
              e.preventDefault();
              try {
                const productData = new FormData();
                productData.append("name", name);
                productData.append("description", description);
                productData.append("price", price);
                productData.append("quantity", quantity);
                productData.append("photo", photo);
                productData.append("category", category);
                const { data } = axios.post(
                  "http://localhost:8000/product/createProduct",
                  productData
                );
                if (data?.success) {
                  toast.error(data?.message);
                } else {
                  toast.success("Product Created Successfully");
                }
              } catch (error) {
                console.log(error);
                toast.error("something went wrong");
              }
            };
          
  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <ADminMenu/>
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit} >
    <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/><br/>
    <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
    <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)}/><br/>
    <input type='text' value={category} onChange={(e)=>setCategory(e.target.value)}/><br/>
    <input type='text' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/><br/>
    <input type='text' value={shipping} onChange={(e)=>setShipping(e.target.value)}/><br/>
    <input type='file' value={photo} onChange={(e)=>setPhoto(e.target.value)}/><br/>
    <button>Submit</button>
    </form>
    </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create_Product