import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './auth.css'

const Register = () => {
    const [name,setName] =useState("")
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const [phone,setPhone] =useState("")
    const [address,setAddress] =useState("")
    const [answer,setAnswer] =useState("")

    const navigate=useNavigate()

    const handleSubmit=async(event)=>{
        event.preventDefault()
        try {
            const response=await axios.post('http://localhost:8000/api/register',{
                name,email,password,phone,address,answer
            })
           if( response.data.success){
            toast.success(response.data.message)
            navigate('/login')
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
    <div className="form-container" style={{ minHeight: "90vh" }}>
      <form onSubmit={handleSubmit}>
        <h4 className="title">REGISTER FORM</h4>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Name"
            required
            autoFocus
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email "
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Phone"
            required
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Address"
            required
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Faviourte Game"
            required
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
          />
        </div>
       
        <button type="submit" className="btn btn-primary">
          REGISTER
        </button>
      </form>
    </div>
  </Layout>
);
};


export default Register