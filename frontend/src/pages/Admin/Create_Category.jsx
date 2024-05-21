import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import ADminMenu from '../../components/layout/ADminMenu'
import toast from 'react-hot-toast';
import axios from 'axios'

const Create_Category = () => {
  const [name,setName]=useState("")
  const handleSubmit=async(event)=>{
    event.preventDefault()
    try {
        const response=await axios.post('http://localhost:8000/category/createCategory',{
            name
        })
       if( response.data.success){
        toast.success(response.data.message)
       }
       else{
        toast.error(response.data.message)
       }
        
    } catch (error) {
        console.log(error)
        toast.error("Somthing Went Wrong")
        
    } 
}

  return (
    <Layout>
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-3">
          <ADminMenu/>
        </div>
        <div className="col-md-9">
          <h1>Create Category</h1>
        </div>
        <h1>Add Category</h1>
    <form onSubmit={handleSubmit}>
    <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
    <button>Submit</button>
    </form>
      </div>
    </div>
  </Layout>
  )
}

export default Create_Category